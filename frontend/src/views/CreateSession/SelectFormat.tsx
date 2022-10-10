import { SessionFormat } from "../../interfaces/Session";

export interface SelectFormatProps
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {}

export function SelectFormatView({ ...props }: SelectFormatProps) {
  return (
    <select {...props}>
      {Object.values(SessionFormat).map((sessionFormat) => (
        <option key={sessionFormat}>{sessionFormat}</option>
      ))}
    </select>
  );
}
