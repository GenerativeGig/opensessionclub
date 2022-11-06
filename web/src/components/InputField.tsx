import { InputHTMLAttributes } from "react";
import { useField, ErrorMessage } from "formik";

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

export function InputField({ label, ...props }: InputFieldProps) {
  const [field] = useField(props);
  return (
    <div className="flex flex-col">
      <div>
        <label htmlFor={field.name}>{label}</label>
        <input {...field} {...props} id={field.name} />
      </div>
      <div className="place-self-end mr-2 text-red-600">
        <ErrorMessage name={field.name} />
      </div>
    </div>
  );
}
