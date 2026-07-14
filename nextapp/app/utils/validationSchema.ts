import * as yup from "yup";
export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export const signupValidation = yup.object().shape({
  userName: yup.string().required("User name is required!"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Password do not match")
    .required("Please confirm your password!"),
});

export type LoginFormData = yup.InferType<typeof loginValidationSchema>;
export type SignupFormData = yup.InferType<typeof signupValidation>;
