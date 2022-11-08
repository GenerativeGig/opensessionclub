import { Session } from "../generated/graphql";
import { SessionDateTime } from "./SessionDateTime";

export interface SessionCardProps {
  session: Omit<Session, "text">;
}

export function SessionCard({ session }: SessionCardProps) {
  return (
    <article className="flex flex-col ml-1">
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl">{session.title}</h1>
        </div>
        <div className="flex flex-col items-end mr-1">
          <SessionDateTime start={session.start} end={session.end} />
        </div>
      </div>
      <p className="my-3 mx-1">{session.textSnippet}</p>
      <div className="flex justify-between">
        <div></div>
        <div className="self-end flex items-center">
          <div>
            <span>participants.length</span>
            <span>/</span>
            <span>{session.attendeeLimit}</span>
          </div>
          <button type="submit" className="bg-green-500 hover:bg-green-400">
            Join Session
          </button>
        </div>
      </div>
    </article>
  );
}
