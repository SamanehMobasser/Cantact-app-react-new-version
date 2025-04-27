import React, { useState, useEffect } from "react";
import { useContacts } from "../context/ContactsContext";
import { ActionTypes } from "../context/ContactsContext";
import styles from "./ContactForm.module.css";

const initialForm = { name: "", lastName: "", email: "", phone: "" };

const ContactForm = () => {
  const { state, dispatch } = useContacts();
  const { modal } = state;

  const isEditMode = modal?.isOpen && modal?.type === "EDIT_CONTACT";
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditMode && modal.data) {
      setFormData(modal.data); 
    } else {
      setFormData(initialForm);
    }
  }, [modal.type, modal.data?.id]); 

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errs = {};
  
    // اعتبارسنجی نام
    if (!formData.name) {
      errs.name = "Name is required";
    } else if (formData.name.length < 3) {
      errs.name = "Name must be at least 3 characters";
    } else if (formData.name.length > 50) {
      errs.name = "Name must be less than 50 characters";
    }
  
    // اعتبارسنجی نام خانوادگی
    if (!formData.lastName) {
      errs.lastName = "Last name is required";
    } else if (formData.lastName.length < 2) {
      errs.lastName = "Last name must be at least 2 characters";
    } else if (formData.lastName.length > 100) {
      errs.lastName = "Last name must be less than 100 characters";
    }
  
    // اعتبارسنجی ایمیل
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formData.email)) {
      errs.email = "Valid email required";
    }
  
    // اعتبارسنجی شماره تلفن
    if (!/^\d{10,15}$/.test(formData.phone)) {
      errs.phone = "Phone must be 10-15 digits";
    }
  
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };
  

  const submitHandler = () => {
    if (!validate()) return;

    if (isEditMode) {
      dispatch({
        type: ActionTypes.EDIT_CONTACT,
        payload: { ...formData, id: modal.data.id },
      });
    } else {
      dispatch({
        type: ActionTypes.ADD_CONTACT,
        payload: { ...formData, id: Date.now() },
      });
    }

    setFormData(initialForm);
    setErrors({});
    dispatch({
      type: ActionTypes.SET_MODAL,
      payload: { isOpen: false, type: null, data: null },
    });
  };

  return (
    <div className={styles.form}>
      <div className={styles.inputWrapper}>
        <input
          name="name"
          value={formData.name}
          onChange={changeHandler}
          placeholder="Name"
          className={errors.name ? styles.invalid : ""}
        />
        {errors.name && <span className={styles.star}>*</span>}
      </div>

      <div className={styles.inputWrapper}>
        <input
          name="lastName"
          value={formData.lastName}
          onChange={changeHandler}
          placeholder="Last Name"
          className={errors.lastName ? styles.invalid : ""}
        />
        {errors.lastName && <span className={styles.star}>*</span>}
      </div>

      <div className={styles.inputWrapper}>
        <input
          name="email"
          value={formData.email}
          onChange={changeHandler}
          placeholder="Email"
          className={errors.email ? styles.invalid : ""}
        />
        {errors.email && <span className={styles.star}>*</span>}
      </div>

      <div className={styles.inputWrapper}>
        <input
          name="phone"
          value={formData.phone}
          onChange={changeHandler}
          placeholder="Phone"
          className={errors.phone ? styles.invalid : ""}
        />
        {errors.phone && <span className={styles.star}>*</span>}
      </div>

      <button onClick={submitHandler}>
        {isEditMode ? "✏️ Edit Contact" : "➕ Add Contact"}
      </button>
    </div>
  );
};

export default ContactForm;
