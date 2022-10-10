import { SessionFormat } from "../../interfaces/Session";

export interface SessionFormatProps {
  formats: SessionFormat[];
}
export function SessionFormatView({ formats }: SessionFormatProps) {
  return (
    <div>
      {formats.map((format) => (
        <span>{format}</span>
      ))}
    </div>
  );
}
