import Panel from '../Panel';
import SearchComponent from '../Search';
import ScrollComponent from '../ScrollComponent';
import ButtonComponent from '@/MyComponents/ButtonComponent';
import "./style.css";
import HorizontalPanel from '@/MyComponents/HorizontalPanel';
import { useEffect, useState, useMemo, useReducer } from 'react';
import {Contact} from '../../Model/Contact';
import {contactReducer, State} from '../../Reducer/reducer';
import {showErrorToast} from '../Toast';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export const initialState: State = {
    contacts: [],
    filteredData: [],
    bookmarks: [],
    sortedOrder: 'asc',
    loading: true,
    error: ''
};

function HomePage(){
    const [state, dispatch] = useReducer(contactReducer, initialState);
    const {contacts, filteredData} = state;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        async function getContacts() {
            try {
                const response = await fetch(apiUrl + '/contacts');
                const responseBody: Contact[] = await response.json();
                dispatch({type: 'GET_CONTACTS', payload: responseBody});
            } catch (error) {
                console.error('Error fetching contacts:', error);
            }
        }
        getContacts();
    }, []); 

    const bookmarks = useMemo(() => contacts.filter(contact => contact.bookmarked), [contacts]);

    const addContact = async (contact: Contact) => {
        try{
            contact.bookmarked = false;
            const response = await fetch(apiUrl + `/contacts/`,{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(contact)
            });
            if (!response.ok) 
                throw new Error(`Add error status: ${response.status} ${response.statusText}`);
            const newContact = await response.json();
            dispatch({type: 'ADD_CONTACT', payload: newContact.data});
        }
        catch(error: any){
            console.error('Error addContact: ', error);
            showErrorToast(error.message);
        }
    }

    const updateBookmark = async (id: string, contact: Contact) => {
        try {
            const response = await fetch(apiUrl + `/contacts/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(contact),
            });
            const updatedBookmark = await response.json();
            if (!response.ok) 
                throw new Error("Failed to update bookmark");
            dispatch({type: 'UPDATE_BOOKMARK', payload: {id, bookmarked: updatedBookmark.bookmarked}})
        } catch (error) {
            console.error('Error updating bookmark:', error);
        }
    };

    const deleteContact = async(id: string) =>{
        try{
            const response = await fetch(apiUrl + `/contacts/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });
            await response.json();
            if (!response.ok) 
                throw new Error("Failed to delete bookmark");
            dispatch({type: 'DELETE_CONTACT', payload: id});
        }
        catch(error){
            console.error('Error delete contact: ', error);
        }
    }

    const downloadContact = async() =>{
        try{
            const response = await fetch(apiUrl + `/contacts/export`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) 
                throw new Error('Failed to download file');
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'filename.zip'; 
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            dispatch({type: 'DOWNLOAD', payload: 'Success'});
        }
        catch(error){
            console.error('Error download contact: ', error);
        }
    }

    const filterData = (query: string, filterType: 'includes' | 'startsWith' = 'includes') => {
        const lowerCaseQuery = query.toLowerCase();
        const filtered = contacts.filter((item) =>
            filterType === 'includes'
                ? item.name.toLowerCase().includes(lowerCaseQuery)
                : item.name.toLowerCase().startsWith(lowerCaseQuery)
        );
        dispatch({type: 'FILTER_DATA', payload: filtered})
    };

    return (
        <div className='container grid '>
            <div className='title font-poppins text-4xl font-bold'>
                <h1 className='mb-3 text-left'>CONTACTS</h1>
            </div>
            <div className='downloadBtn text-end'>
                <div className="mt-3" onClick={()=> downloadContact()}>
                    <Button type="submit"><Download/></Button>
                </div>
            </div>
            <div className='searchComp'>
                <SearchComponent setSearch = {(query)=>filterData(query, 'includes')}/>
            </div>
            <div className='addBtn' onClick={()=> setIsModalOpen(true)}>
                <ButtonComponent isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} addContact={addContact}/>
            </div>
            <div className='narrowCard'>
                <HorizontalPanel data={bookmarks} updateBookmark={updateBookmark}/>
            </div>
            <div className='relative panel'>
                <Panel dataItem={filteredData} updateBookmark={updateBookmark} deleteContact={deleteContact}/>
                <ScrollComponent setSearch = {(query)=> filterData(query, 'startsWith')}/>
            </div>
        </div>
    )
}

export default HomePage;