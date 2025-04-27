
export const ActionTypes = {
  ADD_CONTACT: 'ADD_CONTACT',
  DELETE_CONTACT: 'DELETE_CONTACT',
  EDIT_CONTACT: 'EDIT_CONTACT',
  SET_SELECTED_IDS: 'SET_SELECTED_IDS',
  DELETE_SELECTED: 'DELETE_SELECTED',
  SET_SEARCH_TERM: 'SET_SEARCH_TERM',
  SET_MODAL: 'SET_MODAL',
  SET_CONTACTS: 'SET_CONTACTS',
};


const saveToLocalStorage = (contacts) => {
  localStorage.setItem("contacts", JSON.stringify(contacts));
};


const addContact = (state, contact) => {
  const updated = [...state.contacts, contact];
  saveToLocalStorage(updated);
  return { ...state, contacts: updated };
};

const deleteContact = (state, id) => {
  const updated = state.contacts.filter((c) => c.id !== id);
  saveToLocalStorage(updated);
  return { ...state, contacts: updated };
};

const editContact = (state, updatedContact) => {
  const updated = state.contacts.map((c) =>
    c.id === updatedContact.id ? updatedContact : c
  );
  saveToLocalStorage(updated);
  return { ...state, contacts: updated };
};

const deleteSelected = (state) => {
  const updated = state.contacts.filter((c) => !state.selectedIds.includes(c.id));
  saveToLocalStorage(updated);
  return { ...state, contacts: updated, selectedIds: [] };
};

const setSelectedIds = (state, ids) => ({
  ...state,
  selectedIds: ids,
});

const setSearchTerm = (state, term) => ({
  ...state,
  searchTerm: term,
});

const setModal = (state, modal) => ({
  ...state,
  modal,
});

const setContacts = (state, contacts) => {
  saveToLocalStorage(contacts);
  return {
    ...state,
    contacts,
  };
};

export const contactsReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.ADD_CONTACT:
      return addContact(state, action.payload);
    case ActionTypes.DELETE_CONTACT:
      return deleteContact(state, action.payload);
    case ActionTypes.EDIT_CONTACT:
      return editContact(state, action.payload);
    case ActionTypes.SET_SELECTED_IDS:
      return setSelectedIds(state, action.payload);
    case ActionTypes.DELETE_SELECTED:
      return deleteSelected(state);
    case ActionTypes.SET_SEARCH_TERM:
      return setSearchTerm(state, action.payload);
    case ActionTypes.SET_MODAL:
      return setModal(state, action.payload);
    case ActionTypes.SET_CONTACTS:
      return setContacts(state, action.payload);
    default:
      console.warn(`Unknown action type: ${action.type}`);
      return state;
  }
};


export const initialState = {
  contacts: [],
  selectedIds: [],
  searchTerm: '',
  modal: { isOpen: false, type: null, data: null },
};
