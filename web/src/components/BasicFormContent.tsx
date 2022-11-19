import { ReactNode } from "react";
export interface FormProps {
  inputFieldChildren: ReactNode;
  extraChildren?: ReactNode;
  submitButtonText: string;
}

export function FormContent({
  inputFieldChildren,
  extraChildren,
  submitButtonText,
}: FormProps) {
  return (
    <div className="flex flex-col">
      {inputFieldChildren}
      <div className="place-self-end mr-2">{extraChildren}</div>
      <div className="place-self-end mr-1">
        <button className={`bg-green-500 hover:bg-green-400`} type="submit">
          {submitButtonText}
        </button>
      </div>
    </div>
  );
}
