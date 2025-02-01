import { error } from "console";
import { RequestHandler } from "express";
import {getContacts, addContact, updateContact, deleteContact, exportContacts} from '../services/fileService';
import { contactModel, contactSchema } from "../models/contact";
import {z} from 'zod';
import { createGzip } from "zlib";
import fs, {createReadStream, createWriteStream} from 'node:fs';
import {join} from 'node:path';
import archiver from 'archiver';

const outputFilePath = join(__dirname, '../output/output.zip');
const vcfFilePath = join(__dirname, '../output/output.vcf');

export const get_contact_handler: RequestHandler = (req, res, next) => {
    try{
        const contacts = getContacts();
        res.status(200).json(contacts);
    }
    catch(error){
        if(error instanceof z.ZodError){
            res.status(400).json({
                status: 'Validation failed',
                message: error.errors
            });
        }
        else{
            res.status(error.status || 500).json({
                status: 'Error',
                message: error.message || 'Internal server error'
            });
        }
    }
}

export const post_contact_handler: RequestHandler = (req, res, next) => {
    try{
        const validatedData: contactModel = contactSchema.parse(req.body);
        addContact(validatedData);
        res.status(201).json({ message: 'Contact created successfully', data: validatedData});
    }
    catch(error){
        if(error instanceof z.ZodError){
            res.status(400).json({
                status: 'Validation failed',
                message: error.errors
            });
        }
        else{
            res.status(error.status || 500).json({
                status: 'Error',
                message: error.message || 'Internal server error'
            });
        }
    }
}

export const update_contact_handler:RequestHandler = (req, res, next) =>{
    try{
        const {id} = req.params;
        const validatedData: contactModel = contactSchema.parse(req.body);
        updateContact(id, validatedData);
        res.status(200).json({ message: 'Contact uptated successfully', data: validatedData});
    }
    catch(error){
        if(error instanceof z.ZodError){
            res.status(400).json({
                status: 'Validation failed',
                message: error.errors
            });
        }
        else{
            res.status(error.status || 500).json({
                status: 'Error',
                message: error.message || 'Internal server error'
            });
        }
        next(error);
    }
}

export const delete_contact_handler: RequestHandler = (req, res, next) => {
    try{
        const {id} = req.params;
        deleteContact(id);
        res.status(200).json({ message: 'Contact deleted successfully', data: id});
    }
    catch(error){
        res.status(error.status || 500).json({
            status: 'Error',
            message: error.message || 'Internal server error'
        });
        next(error);
    }
}

export const export_contacts_handler: RequestHandler = async (req, res, next)=>{
    try{
        await exportContacts();

        const output = fs.createWriteStream(outputFilePath);
        const archive = archiver('zip', { zlib: {level: 9}});

        archive.on('error', (err)=>{ console.error('Error: ', err)});
        archive.pipe(output);
        archive.file(vcfFilePath, {name: 'output.vcf'});
        archive.finalize();

        output.on('close', () => {
            res.download(outputFilePath, 'output.zip', (err)=>{
                if(err)
                    console.error(`Error sending file: `, err);
                else{
                    console.log(`File sent successfully!`);
                    if (!res.headersSent) {
                        res.status(200).json({ message: 'File sent successfully' });
                    }
                }
            });

            fs.unlink(vcfFilePath, (unlinkErr) => {
                if(unlinkErr)
                    console.error(`Error deleting vcf file: `, unlinkErr);
                else 
                    console.log(`vcf file deleted successfully`);
            });
        });
        // res.status(200).json({message: 'File sent successfully'});
    }
    catch(error){
        res.status(error.status || 500).json({
            status: 'Error',
            message: error.message || 'Invalid server error'
        });
        next(error);
    }
}

export const route_not_found: RequestHandler = (req, res, next) => {
    next(new Error(`Route not found`));
}

export const error_request_handler: RequestHandler = (req, res, next) => {
    if(error instanceof Error)
        res.json({error: error.message});
}