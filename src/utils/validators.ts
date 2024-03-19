import { object, string } from "yup";

export const importBatchSchema = object().shape({
  file: string().required("File is required"),
});

export const loginSchema = object().shape({
  email: string().email("Email is invalid").required("Email is required"),
  password: string().required("Password is required"),
});

export const inviteTeamSchema = object().shape({
  firstName: string().required("First name is required"),
  lastName: string().required("Last name is required"),
  role: string().required("Role is required"),
  email: string().email("Email is invalid").required("Email is required"),
});

export const changePasswordSchema = object().shape({
  old_password: string().required("Old password is required"),
  new_password: string().required("New password is required"),
  confirm_password: string().required("Confirm your Password"),
});

export const filterUsersSchema = object().shape({
  role: string(),
  isActive: string(),
});
