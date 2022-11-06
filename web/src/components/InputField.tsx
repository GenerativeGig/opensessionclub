import { InputHTMLAttributes } from "react";
import { useField, ErrorMessage } from "formik";

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  inputElement?: HTMLInputElement;
}

export function InputField({ label, inputElement, ...props }: InputFieldProps) {
  const [field] = useField(props);

  const InputElement = input;
  if (inputElement) {
  }
  return (
    <div className="flex flex-col">
      <div>
        <label htmlFor={field.name}>{label}</label>
        <InputElement required {...field} {...props} id={field.name} />
      </div>
      <div className="place-self-end mr-2 text-red-600">
        <ErrorMessage name={field.name} />
      </div>
    </div>
  );
}
