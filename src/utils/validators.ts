import { object, string } from "yup";

export const importBatchSchema = object().shape({
  file: string().required("File is required"),
  batchName: string().required("Batch name is required"),
});

export const loginSchema = object().shape({
  email: string().email("Email is invalid").required("Email is required"),
  password: string().required("Password is required"),
});
