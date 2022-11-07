import { useField } from "formik";
import { InputHTMLAttributes } from "react";

export interface InputTimePeriodProps
  extends InputHTMLAttributes<HTMLInputElement> {
  startTimeName: string;
  endTimeName: string;
}
export function InputTimePeriod({
  startTimeName,
  endTimeName,
  ...props
}: InputTimePeriodProps) {
  const [startField] = useField({ name: startTimeName, ...props });
  const [endField] = useField({ name: endTimeName, ...props });
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
        {...endField}
        {...props}
        required
        name={endField.name}
        id={endField.name}
        type="time"
      />
    </fieldset>
  );
}
