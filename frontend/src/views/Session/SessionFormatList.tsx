import { SessionFormat } from "../../interfaces/Session";

export interface SessionFormatListProps {
  formats: SessionFormat[];
}
export function SessionFormatListView({ formats }: SessionFormatListProps) {
  return (
    <div className="mt-2 mb-1">
      {formats.map((format) => (
        <span className="p-1 mr-1 bg-blue-700 rounded">{format}</span>
      ))}
    </div>
  );
}
