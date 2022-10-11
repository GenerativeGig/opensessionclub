import { SessionFormat } from "../../interfaces/Session";

export interface SessionFormatListProps {
  formats: SessionFormat[];
}
export function SessionFormatListView({ formats }: SessionFormatListProps) {
  return (
    <div>
      {formats.map((format) => (
        <span>{format}</span>
      ))}
    </div>
  );
}
