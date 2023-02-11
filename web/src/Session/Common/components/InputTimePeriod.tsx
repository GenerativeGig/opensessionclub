import { useField } from "formik";
import { InputHTMLAttributes } from "react";

export interface InputTimePeriodProps
  extends InputHTMLAttributes<HTMLInputElement> {
  startTimeName: string;
  stopTimeName: string;
}
export function InputTimePeriod({
  startTimeName,
  stopTimeName,
  ...props
}: InputTimePeriodProps) {
  const [startField] = useField({ name: startTimeName, ...props });
  const [stopField] = useField({ name: stopTimeName, ...props });
  return (
    <fieldset>
      <legend className="float-left my-3 mr-2 ml-[102px]">Time</legend>
      <input
        {...startField}
        {...props}
        required
        name={startField.name}
        id={startField.name}
        type="time"
      />
      <span> - </span>
      <input
        {...stopField}
        {...props}
        required
        name={stopField.name}
        id={stopField.name}
        type="time"
      />
    </fieldset>
  );
}
