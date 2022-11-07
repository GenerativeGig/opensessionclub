import { InputHTMLAttributes } from "react";
import { useField, ErrorMessage, FieldInputProps } from "formik";

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  textarea?: boolean;
}

export function InputField({ label, textarea, ...props }: InputFieldProps) {
  const [field] = useField(props);

  return (
    <div className="flex flex-col">
      <div>
        <label htmlFor={field.name}>{label}</label>
        <input {...field} {...props} required id={field.name} />
      </div>
      <div className="place-self-end mr-2 text-red-600">
        <ErrorMessage name={field.name} />
      </div>
    </div>
  );
}
