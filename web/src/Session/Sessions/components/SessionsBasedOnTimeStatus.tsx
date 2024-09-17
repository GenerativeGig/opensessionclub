import { Link } from "react-router-dom";
import { TimeStatus, TimeStatusText } from "../../Common/components/TimeStatus";
import { Session } from "../../generatedTypes";
import { SessionCard } from "./SessionCard";

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
      <p className="my-8 text-center">
        No {TimeStatusText[timeStatus].toLowerCase()} sessions.
      </p>
    );
  }

  return (
    <>
      <ol className="flex w-full flex-col">
        {sessions?.map((session) => (
          <li key={session.id}>
            <Link to={`/session/${session.id}`}>
              <div
                className={`w-full rounded-md border-2 border-solid bg-slate-800 p-4 first:mt-2 last:mb-2 ${borderColor} ${borderHoverBackgroundColor}`}
              >
                <SessionCard {...session} />
              </div>
            </Link>
          </li>
        ))}
      </ol>
      {hasMore && (
        <button
          className="w-32 self-center bg-slate-500 hover:bg-slate-400"
          onClick={() => setCursor(sessions[sessions.length - 1].start)}
        >
          Load more
        </button>
      )}
    </>
  );
}
