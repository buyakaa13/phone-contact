import { useContext, useReducer } from "react";
import {contactReducer} from '../Reducer/reducer';
import {initialState} from '../MyComponents/HomePage'; 
import {State} from '../Reducer/reducer';
import { Contact } from "@/Model/Contact";
import React from "react";

const apiUrl = import.meta.env.VITE_API_URL;

interface BookmarkContextType {
  updateBookmark: (id: string, data: Contact) => Promise<void>;
  state: State;
}

export const BookmarkContext = React.createContext<BookmarkContextType>({
  updateBookmark: async () => {},
  state: initialState,
});

export const useBookmark = () => {
  const context = useContext(BookmarkContext);
  if (!context) throw new Error("useBookmark must be used within BookmarkProvider");
  return context;
};

export const BookmarkProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(contactReducer, initialState);
    const updateBookmark = async (id: string, data: Contact) => {
      try {
        const response = await fetch(apiUrl + `/contacts/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
  
        if (!response.ok) 
          throw new Error("Failed to update bookmark");
  
        const updatedBookmark = await response.json();
        dispatch({
          type: "UPDATE_BOOKMARK",
          payload: { id, bookmarked: updatedBookmark.bookmarked },
        });
      } catch (error) {
        console.error("Error updating bookmark:", error);
      }
    };

    return (
        <BookmarkContext.Provider value={{ updateBookmark, state}}>
        {children}
        </BookmarkContext.Provider>
    );
};
