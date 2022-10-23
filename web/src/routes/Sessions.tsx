import { Session } from "../interfaces/session.interface";
import { SessionCard } from "../components/Session";
import { Wrapper } from "../components/Wrapper";

export interface SessionsProps {
  sessions: Session[];
}

export function Sessions({ sessions }: SessionsProps) {
  return (
    <section>
      <ol className="flex flex-col">
        {sessions.map((session: Session) => (
          <li
            key={session.id}
            className="m-1 p-4 first:mt-2 last:mb-2 w-full rounded-md bg-slate-800"
          >
            <SessionCard session={session} />
          </li>
        ))}
      </ol>
    </section>
  );
}
