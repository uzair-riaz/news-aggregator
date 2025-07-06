import * as Yup from "yup";

export interface LoginDTO {
  email: string;
  password: string;
}

export const loginValidations = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});
