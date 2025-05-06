import React, { useEffect, useState } from "react";
import { useContacts } from "../context/ContactsContext";
import { ActionTypes } from "../context/ContactsContext";
import { Formik, Field, Form } from "formik";
import { contactValidationSchema } from "../schemas/validationSchema"; // وارد کردن schema از فایل جداگانه
import styles from "./ContactForm.module.css";
import { toast } from "react-toastify";

// مقادیر اولیه فرم
const initialForm = { name: "", lastName: "", email: "", phone: "" };

const ContactForm = () => {
  const { state, dispatch } = useContacts();
  const { modal } = state;

  const isEditMode = modal?.isOpen && modal?.type === "EDIT_CONTACT";
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (isEditMode && modal.data) {
      setFormData(modal.data);
    } else {
      setFormData(initialForm);
    }
  }, [modal.type, modal.data?.id]);

  // ارسال فرم
  const submitHandler = (values) => {
    if (isEditMode) {
      dispatch({
        type: ActionTypes.EDIT_CONTACT,
        payload: { ...values, id: modal.data.id },
      });
      toast.success("Contact edited successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      dispatch({
        type: ActionTypes.ADD_CONTACT,
        payload: { ...values, id: Date.now() },
      });
    }

    setFormData(initialForm);
    dispatch({
      type: ActionTypes.SET_MODAL,
      payload: { isOpen: false, type: null, data: null },
    });
  };

  return (
    <div className={styles.formContainer}>
      <Formik
        initialValues={formData} // مقداردهی اولیه
        validationSchema={contactValidationSchema} // استفاده از schema برای اعتبارسنجی
        enableReinitialize={true} // برای بازنشانی مقادیر اولیه فرم
        onSubmit={submitHandler} // ارسال داده‌ها به هنگام submit
      >
        {({ touched, errors }) => (
          <Form className={styles.form}>
            {/* ورودی نام */}
            <div className={styles.inputWrapper}>
              <Field
                name="name"
                placeholder="Name"
                className={touched.name && errors.name ? styles.invalid : ""}
              />
              {touched.name && errors.name && (
                <div className={styles.error}>{errors.name}</div>
              )}
            </div>

            {/* ورودی نام خانوادگی */}
            <div className={styles.inputWrapper}>
              <Field
                name="lastName"
                placeholder="Last Name"
                className={touched.lastName && errors.lastName ? styles.invalid : ""}
              />
              {touched.lastName && errors.lastName && (
                <div className={styles.error}>{errors.lastName}</div>
              )}
            </div>

            {/* ورودی ایمیل */}
            <div className={styles.inputWrapper}>
              <Field
                name="email"
                placeholder="Email"
                className={touched.email && errors.email ? styles.invalid : ""}
              />
              {touched.email && errors.email && (
                <div className={styles.error}>{errors.email}</div>
              )}
            </div>

            {/* ورودی شماره تلفن */}
            <div className={styles.inputWrapper}>
              <Field
                name="phone"
                placeholder="Phone"
                className={touched.phone && errors.phone ? styles.invalid : ""}
              />
              {touched.phone && errors.phone && (
                <div className={styles.error}>{errors.phone}</div>
              )}
            </div>

            {/* دکمه ارسال */}
            <button type="submit">
              {isEditMode ? "✏️ Edit Contact" : "➕ Add Contact"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactForm;
