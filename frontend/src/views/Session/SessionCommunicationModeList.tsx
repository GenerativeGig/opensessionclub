import { SessionCommunicationMode } from "../../interfaces/Session";

export interface SessionCommunicationModeListProps {
  communicationModes: SessionCommunicationMode[];
}
export function SessionCommunicationModeListView({
  communicationModes,
}: SessionCommunicationModeListProps) {
  return (
    <div className="mt-1">
      {communicationModes.map((communicationMode) => (
        <span className="p-1 mr-1 bg-purple-700 rounded">
          {communicationMode}
        </span>
      ))}
    </div>
  );
}
