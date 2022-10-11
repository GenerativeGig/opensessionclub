import { SessionCommunicationMode } from "../../interfaces/Session";

export interface SessionCommunicationModeListProps {
  communicationModes: SessionCommunicationMode[];
}
export function SessionCommunicationModeListView({
  communicationModes,
}: SessionCommunicationModeListProps) {
  return (
    <div>
      {communicationModes.map((communicationMode) => (
        <span>{communicationMode}</span>
      ))}
    </div>
  );
}
