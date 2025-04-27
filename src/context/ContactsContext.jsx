import React, { createContext, useReducer, useContext, useEffect } from "react";


const saveToLocalStorage = (contacts) => {
  localStorage.setItem("contacts", JSON.stringify(contacts));
};

const loadFromLocalStorage = () => {
  const savedContacts = localStorage.getItem("contacts");
  return savedContacts ? JSON.parse(savedContacts) : [];
};

export const ActionTypes = {
  ADD_CONTACT: "ADD_CONTACT",
  DELETE_CONTACT: "DELETE_CONTACT",
  EDIT_CONTACT: "EDIT_CONTACT",
  SET_CONTACTS: "SET_CONTACTS",
  SET_MODAL: "SET_MODAL",
  SET_SELECTED_IDS: "SET_SELECTED_IDS",
  DELETE_SELECTED: "DELETE_SELECTED",
  OPEN_EDIT_MODAL: "OPEN_EDIT_MODAL", 
};


const contactsReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_CONTACTS:
      return { ...state, contacts: action.payload };

    case ActionTypes.ADD_CONTACT:
      const updatedAdd = [...state.contacts, action.payload];
      saveToLocalStorage(updatedAdd);
      return { ...state, contacts: updatedAdd };

    case ActionTypes.DELETE_CONTACT:
      const updatedDelete = state.contacts.filter(
        (c) => c.id !== action.payload
      );
      saveToLocalStorage(updatedDelete);
      return { ...state, contacts: updatedDelete };

    case ActionTypes.EDIT_CONTACT:
      const updatedEdit = state.contacts.map((c) =>
        c.id === action.payload.id ? action.payload : c
      );
      saveToLocalStorage(updatedEdit);
      return { ...state, contacts: updatedEdit };

    case ActionTypes.SET_MODAL:
      return { ...state, modal: action.payload };

    case ActionTypes.OPEN_EDIT_MODAL:
      return {
        ...state,
        modal: {
          isOpen: true,
          type: "EDIT_CONTACT",
          data: action.payload,
        },
      };

    case ActionTypes.SET_SELECTED_IDS:
      return { ...state, selectedIds: action.payload };

    case ActionTypes.DELETE_SELECTED:
      // حذف مخاطبین انتخاب شده
      const filtered = state.contacts.filter(
        (c) => !state.selectedIds.includes(c.id)
      );
      saveToLocalStorage(filtered);
      return { ...state, contacts: filtered, selectedIds: [] };

    default:
      return state;
  }
};


const ContactsContext = createContext();
export const useContacts = () => useContext(ContactsContext);


export const ContactsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(contactsReducer, {
    contacts: [],
    selectedIds: [],
    modal: { isOpen: false, type: null, data: null },
  });


  useEffect(() => {
    const saved = loadFromLocalStorage();
    if (saved.length) {
      dispatch({ type: ActionTypes.SET_CONTACTS, payload: saved });
    }
  }, []);

  return (
    <ContactsContext.Provider value={{ state, dispatch }}>
      {children}
    </ContactsContext.Provider>
  );
};
