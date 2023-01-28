import { ErrorMessage, useField } from "formik";
import { InputHTMLAttributes, ReactNode } from "react";

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  info?: ReactNode;
}

export function InputField({ label = "", info, ...props }: InputFieldProps) {
  const [field] = useField(props);

  return (
    <div className="flex flex-col md:flex-row">
      <div>
        <label htmlFor={field.name}>{label}</label>
        <input id={field.name} required {...field} {...props} />
        {info && <span>{info}</span>}
      </div>
      <div className="place-self-end mr-2 text-red-600">
        <ErrorMessage name={field.name} />
      </div>
    </div>
  );
}
