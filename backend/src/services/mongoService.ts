import {join} from 'node:path';
import fs, { readFileSync, writeFileSync } from 'node:fs';
import {contactModel} from '../models/contact';
import {Contact} from '../models/contactMongo';
import {v4 as uuidv4} from 'uuid';
require('dotenv').config();
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;
const dbPort = process.env.DB_PORT;
const type = process.env.SERVICE_TYPE;

const pathToFile = join(__dirname, '../database/db.json');
const outputFilePath = join(__dirname, '../output/output.vcf');

export const db = mongoose.connect((`mongodb://${dbHost}:${dbPort}/${dbName}`))
.then(res => {
    if(res){
        console.log(`Database connection succeffully to ${dbName}`)
    }
    
}).catch(err => {
    console.log(err)
})

export function getContacts(){
    try{
        if(!fs.existsSync(pathToFile))
            throw { message: (`Folder doesn't exists`), statusCode: 404};
       const data = fs.readFileSync(pathToFile, 'utf8');
       return JSON.parse(data);
    }
    catch(error){
        throw error;
    }
}

export async function addContact(contact: contactModel){
    try{
        if(type === 'filesystem'){
            if(!fs.existsSync(pathToFile))
                throw { message: `Folder doesn't exists`, statusCode: 404};
            const fileData = fs.readFileSync(pathToFile, 'utf8');
            const mainData: contactModel[] = JSON.parse(fileData);
            if(mainData.find(data=> data.name == contact.name))
                throw { message: `Already existing data!`, statusCode: 404};
            contact.id = uuidv4();
            mainData.push(contact);
            fs.writeFileSync(pathToFile, JSON.stringify(mainData));
        }
        else{
            console.log('HERE: ')
            const newContact = await Contact.create();
            return {status: "Success", data: newContact};
        }
    }
    catch(error){
        throw error;
    }
}

export function updateContact(id: string, contact: contactModel){
    try{
        if(!fs.existsSync(pathToFile))
            throw { message: (`Folder doesn't exists`), statusCode: 404};
        const fileData = fs.readFileSync(pathToFile, 'utf8');
        const mainData: contactModel[] = JSON.parse(fileData);
        const exist = mainData.find(data=> data.id === id);
        if(!exist)
            throw { message: `Can't find data!`, statusCode: 404};
        console.log("exist: ", exist);
        exist.name = contact.name;
        exist.phone = contact.phone;
        exist.email = contact.email;
        exist.bookmarked = contact.bookmarked;
        fs.writeFileSync(pathToFile, JSON.stringify(mainData));
    }
    catch(error){
        throw error;
    }
}

export function deleteContact(id: string){
    try{
        if(!fs.existsSync(pathToFile))
            throw { message: (`Folder doesn't exists`), statusCode: 404};
        const fileData = fs.readFileSync(pathToFile, 'utf8');
        const mainData: contactModel[] = JSON.parse(fileData);
        const updatedData = mainData.filter(data=> data.id !== id);
        if(updatedData.length === mainData.length)
            throw {message: `Can't find data!`, statusCode: 404};
        fs.writeFileSync(pathToFile, JSON.stringify(updatedData));
    }
    catch(error){
        throw error;
    }
}

export async function exportContacts(){
    try{
        if(!fs.existsSync(pathToFile))
            throw { message: (`Folder doesn't exists`), statusCode: 404};
        const fileDatas: contactModel[] = JSON.parse(fs.readFileSync(pathToFile, 'utf8'));
        const vCards = fileDatas.map(contactToVCard).join('\n\n');
        await fs.writeFileSync(outputFilePath, vCards, 'utf8');
    }
    catch(error){
        throw error;
    }
}

function contactToVCard(contact: contactModel): string{
    return `
    BEGIN:VCARD
    NAME:${contact.name}
    EMAIL:${contact.email}
    PHONE:${contact.phone}
    BOOKMARKED:${contact.bookmarked}
    END:VCARD
    `.trim();
}