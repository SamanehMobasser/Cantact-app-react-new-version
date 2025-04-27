import React from "react";
import { useState } from "react";
import { useContacts } from "../context/ContactsContext";
import { ActionTypes } from "../context/ContactsContext";
import ContactForm from "./ContactForm";
import ContactsList from "./ContactsList";
import Search from "./Search";
import ConfirmModal from "./ConfirmModal";
import styles from "./Contacts.module.css";

const Contacts = () => {
  const { state, dispatch } = useContacts();
  const { contacts = [], selectedIds = [], modal = {} } = state;
  const [searchTerm, setSearchTerm] = useState("");

  const filteredContacts = contacts.filter((contact) => {
    const fullName = `${contact.name} ${contact.lastName}`.toLowerCase();
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  // حذف تکی
  const deleteHandler = (ids) => {
    if (ids) {
      ids.forEach((id) => {
        dispatch({
          type: ActionTypes.DELETE_CONTACT,
          payload: id,
        });
      });
    }
  };

  // ویرایش
  const editHandler = (id) => {
    const contactToEdit = contacts.find((c) => c.id === id);
    if (contactToEdit) {
      dispatch({
        type: ActionTypes.SET_MODAL,
        payload: {
          isOpen: true,
          type: "CONFIRM_EDIT", 
          data: contactToEdit, 
        },
      });
    }
  };


  const toggleSelectHandler = (id) => {
    const newSelected = selectedIds.includes(id)
      ? selectedIds.filter((sid) => sid !== id)
      : [...selectedIds, id];

    dispatch({
      type: ActionTypes.SET_SELECTED_IDS,
      payload: newSelected,
    });
  };

 

  return (
    <div className={styles.container}>
      <h2>📒 Contact Manager</h2>

      
      <ContactForm />

     
      <Search value={searchTerm} onChange={setSearchTerm} />

     
      <ContactsList
        contacts={filteredContacts}
        selectedIds={selectedIds}
        deleteHandler={deleteHandler}
        editHandler={editHandler}
        toggleSelectHandler={toggleSelectHandler}
      />

      
      {modal.isOpen && <ConfirmModal />}
    </div>
  );
};

export default Contacts;
