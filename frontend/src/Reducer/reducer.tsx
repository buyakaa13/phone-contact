import {Contact} from '../Model/Contact';

export interface State{
    contacts: Contact[];
    filteredData: Contact[];
    bookmarks: Contact[];
    sortedOrder: 'asc' | 'desc';
    loading: boolean;
    error: string;
}

type Action = 
| {type: 'GET_CONTACTS'; payload: Contact[]}
| {type: 'UPDATE_BOOKMARK'; payload: {id: string; bookmarked: boolean}}
| {type: 'FILTER_DATA'; payload: Contact[]}
| {type: 'SORT_DATA'; payload: {sortedContacts: Contact[]; sortedOrder: 'asc' | 'desc'}}
| {type: 'DELETE_CONTACT'; payload: string}
| {type: 'SET_LOADING'; payload: boolean}
| {type: 'SET_ERROR'; payload: string}
| {type: 'ADD_CONTACT'; payload: Contact}
| {type: 'DOWNLOAD'; payload: string}

export function contactReducer(state: State, action: Action): State{
    switch(action.type){
        case 'GET_CONTACTS':
            return {
                ...state,
                contacts: action.payload,
                filteredData: action.payload
            };
        case 'UPDATE_BOOKMARK':
            const updateContacts = state.contacts.map((contact)=>contact.id === action.payload.id ? {...contact, bookmarked: action.payload.bookmarked} : contact);
            return {
                ...state,
                contacts: updateContacts,
                filteredData: updateContacts
            };
        case 'ADD_CONTACT':
            return{
                ...state,
                contacts: [action.payload, ...state.contacts],
                filteredData: [action.payload, ...state.filteredData]
            };
        case 'FILTER_DATA':
            return{
                ...state,
                filteredData: action.payload
            }
        case 'DELETE_CONTACT':
             const remainContacts = state.contacts.filter((contact)=> contact.id !== action.payload);
             return {
                ...state,
                contacts: remainContacts,
                filteredData: remainContacts
             }
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.payload
            }
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload,
                loading: false,
            }
        case 'DOWNLOAD':
            return{
                ...state,
                error: action.payload,
                loading: false,
            }
        default:
            return state;
    }

}