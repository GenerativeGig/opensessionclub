import { Session } from "../interfaces/Session";
import { SessionView } from "./Session/Session";

export interface SessionListProps {
  sessions: Session[];
}

export function SessionListView({ sessions }: SessionListProps) {
  return (
    <section>
      <ol>
        {sessions.map((session: Session) => (
          <li key={session.id}>
            <SessionView session={session} />
          </li>
        ))}
      </ol>
    </section>
  );
}
