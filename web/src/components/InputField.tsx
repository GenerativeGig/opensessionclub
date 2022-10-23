import { InputHTMLAttributes } from "react";
import { useField, ErrorMessage } from "formik";

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

export function InputField({ label, ...props }: InputFieldProps) {
  const [field] = useField(props);
  return (
    <div>
      <label htmlFor={field.name}>{label}</label>
      <input {...field} {...props} id={field.name} />
      <ErrorMessage name={field.name} />
    </div>
  );
}
