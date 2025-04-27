import React from "react";
import { useContacts } from "../context/ContactsContext";
import { ActionTypes } from "../context/ContactsContext";
import styles from "./ConfirmModal.module.css";

const ConfirmModal = () => {
  const { state, dispatch } = useContacts();
  const { isOpen, type, data } = state.modal;

  const closeModal = () => {
    dispatch({
      type: ActionTypes.SET_MODAL,
      payload: { isOpen: false, type: null, data: null },
    });
  };

  const confirmHandler = () => {
    if (type === "CONFIRM_EDIT") {
    
      dispatch({
        type: ActionTypes.SET_MODAL,
        payload: { isOpen: false, type: null, data: null },
      });

      
      dispatch({
        type: ActionTypes.OPEN_EDIT_MODAL,
        payload: data,
      });

      return;
    }

    if (type === "DELETE_CONTACT") {
      dispatch({ type: ActionTypes.DELETE_CONTACT, payload: data.id });
      closeModal();
    }

    if (type === "DELETE_SELECTED") {
      dispatch({ type: ActionTypes.DELETE_SELECTED });
      closeModal();
    }
  };

  if (
    !isOpen ||
    (type !== "CONFIRM_EDIT" &&
      type !== "DELETE_CONTACT" &&
      type !== "DELETE_SELECTED")
  ) {
    return null;
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h3>
          {type === "DELETE_CONTACT"
            ? "Delete Contact?"
            : type === "DELETE_SELECTED"
            ? "Delete Selected Contacts?"
            : "Edit Contact?"}
        </h3>
        <p>
          {type === "DELETE_CONTACT"
            ? "Are you sure you want to delete this contact?"
            : type === "DELETE_SELECTED"
            ? "Are you sure you want to delete all selected contacts?"
            : "Are you sure you want to edit this contact?"}
        </p>
        <button className={styles.cancel} onClick={closeModal}>
          Cancel
        </button>
        <button className={styles.Edit} onClick={confirmHandler}>
          {type === "DELETE_CONTACT" || type === "DELETE_SELECTED"
            ? "Delete"
            : "Edit"}
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;
