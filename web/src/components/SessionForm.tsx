import { Formik } from "formik";
import { Form, useNavigate } from "react-router-dom";
import { InputField } from "./InputField";
import { InputTextArea } from "./InputTextArea";

export interface SessionFormProps {
  onSubmit: any;
  submitButtonText: string;
}

export function SessionForm({ onSubmit, submitButtonText }: SessionFormProps) {
  const navigate = useNavigate();
  return <></>;
}
