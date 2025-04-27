import ContactItem from "./ContactItem";
import styles from "./ContactsList.module.css";
import { useContacts } from "../context/ContactsContext";
import { ActionTypes } from "../context/ContactsContext";


function ContactsList({
  contacts, 
  selectedIds,
  deleteHandler,
  editHandler,
  toggleSelectHandler,
}) {
  const { dispatch } = useContacts();
  
  console.log("ContactsList rendered"); 

  const confirmDeleteHandler = (id) => {
    dispatch({
      type: ActionTypes.SET_MODAL,
      payload: {
        isOpen: true,
        type: "DELETE_CONTACT",
        data: { id },
      },
    });
  };

  const confirmGroupDeleteHandler = () => {
    dispatch({
      type: ActionTypes.SET_MODAL,
      payload: {
        isOpen: true,
        type: "DELETE_SELECTED",
        data: null,
      },
    });
  };

  return (
    <div className={styles.container}>
      <h3>Contacts List</h3>

      {contacts?.length ? (
        <ul>
          {contacts.map((contact) => (
            <ContactItem
              key={contact.id}
              data={contact}
              isSelected={selectedIds.includes(contact.id)}
              onDelete={() => confirmDeleteHandler(contact.id)}
              onEdit={editHandler}
              onToggleSelect={toggleSelectHandler}
            />
          ))}
        </ul>
      ) : (
        <p className={styles.errorNothing}>No contacts yet!</p>
      )}

      {selectedIds.length > 0 && (
        <button
          className={styles.deleteSelectedBtn}
          onClick={confirmGroupDeleteHandler}
        >
          🗑 Delete Selected ({selectedIds.length})
        </button>
      )}
    </div>
  );
}

export default ContactsList;
