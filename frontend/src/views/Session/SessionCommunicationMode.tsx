import { SessionCommunicationMode } from "../../interfaces/Session";

export interface SessionCommunicationModeProps {
  communicationModes: SessionCommunicationMode[];
}
export function SessionCommunicationModeView({
  communicationModes,
}: SessionCommunicationModeProps) {
  return (
    <div>
      {communicationModes.map((communicationMode) => (
        <span>{communicationMode}</span>
      ))}
    </div>
  );
}
