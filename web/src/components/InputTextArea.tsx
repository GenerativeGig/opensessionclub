import { ErrorMessage, useField } from "formik";
import { InputHTMLAttributes } from "react";

export interface InputFieldProps
  extends InputHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
  noLabel?: boolean;
}

export function InputTextArea({ label, noLabel, ...props }: InputFieldProps) {
  const [field] = useField(props);

  return (
    <div className="flex flex-col">
      <div className="flex">
        {!noLabel && (
          <label className="mt-3" htmlFor={field.name}>
            {label}
          </label>
        )}
        <textarea
          className="self-start w-[500px] h-[200px]"
          placeholder={props.placeholder}
          id={field.name}
          {...field}
          {...props}
        />
      </div>
      <div className="place-self-end mr-2 text-red-600">
        <ErrorMessage name={field.name} />
      </div>
    </div>
  );
}
