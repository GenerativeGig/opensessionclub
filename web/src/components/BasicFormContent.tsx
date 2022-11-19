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
    <div className="flex flex-col items-center">
      {inputFieldChildren}
      <div className="self-end">{extraChildren}</div>
      <button className={`bg-green-500 hover:bg-green-400`} type="submit">
        {submitButtonText}
      </button>
    </div>
  );
}
