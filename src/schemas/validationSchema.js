// src/utils/validationSchema.js
import * as Yup from 'yup';

// ایجاد schema اعتبارسنجی با Yup
export const contactValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Name is required"),

  lastName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .max(100, "Last name must be less than 100 characters")
    .required("Last name is required"),

  email: Yup.string()
    .email("Valid email required")
    .required("Email is required"),

  phone: Yup.string()
    .matches(/^\d{10,15}$/, "Phone must be 10-15 digits")
    .required("Phone is required")
});
