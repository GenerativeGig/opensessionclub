import { Link } from "react-router-dom";
import { SessionCard } from "../components/SessionCard";
import { TimeStatus, TimeStatusText } from "../components/TimeStatus";
import { Session } from "../generated/graphql";

export interface SessionsBasedOnTimeStatusProps {
  sessions: Session[];
  hasMore: boolean;
  timeStatus: TimeStatus;
  setCursor: (cursor: string) => void;
}

export function SessionsBasedOnTimeStatus({
  sessions,
  hasMore,
  timeStatus,
  setCursor,
}: SessionsBasedOnTimeStatusProps) {
  let borderColor: string;
  let borderHoverBackgroundColor: string;

  switch (timeStatus) {
    case TimeStatus.PAST:
      borderColor = "border-gray-500";
      borderHoverBackgroundColor = "hover:bg-gray-700";
      break;
    case TimeStatus.UPCOMING:
      borderColor = "border-purple-500";
      borderHoverBackgroundColor = "hover:bg-purple-900";
      break;
    case TimeStatus.ONGOING:
      borderColor = "border-green-500";
      borderHoverBackgroundColor = "hover:bg-green-900";
      break;
  }

  if (sessions.length === 0) {
    return (
      <p className="text-center my-8">
        No {TimeStatusText[timeStatus]} sessions.
      </p>
    );
  }

  return (
    <>
      <ol className="flex flex-col w-full">
        {sessions?.map((session) => (
          <li key={session.id}>
            <Link to={`/session/${session.id}`}>
              <div
                className={`m-1 p-4 first:mt-2 last:mb-2 w-full rounded-md bg-slate-800 border-solid border-2 ${borderColor} ${borderHoverBackgroundColor}`}
              >
                <SessionCard {...session} />
              </div>
            </Link>
          </li>
        ))}
      </ol>
      {hasMore && (
        <button
          className="bg-slate-500 hover:bg-slate-400 w-32 self-center"
          onClick={() => setCursor(sessions[sessions.length - 1].start)}
        >
          Load more
        </button>
      )}
    </>
  );
}
