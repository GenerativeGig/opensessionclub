import { Session } from "../interfaces/Session";
import { SessionView } from "./Session/Session";

export interface SessionListProps {
  sessions: Session[];
}

export function SessionListView({ sessions }: SessionListProps) {
  return (
    <section className="h-full w-full">
      <ol className="flex flex-col items-center">
        {sessions.map((session: Session) => (
          <li
            key={session.id}
            className="m-1 p-4 first:mt-2 last:mb-2 w-full max-w-[768px] rounded-md bg-slate-800"
          >
            <SessionView session={session} />
          </li>
        ))}
      </ol>
    </section>
  );
}
