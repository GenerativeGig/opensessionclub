import { SessionCommunicationMode } from "../../interfaces/Session";

interface SelectCommunicationModeProps
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {}

export function SelectCommunicationModeView({
  ...props
}: SelectCommunicationModeProps) {
  return (
    <select {...props}>
      {Object.values(SessionCommunicationMode).map((communicationMode) => (
        <option key={communicationMode}>{communicationMode}</option>
      ))}
    </select>
  );
}
