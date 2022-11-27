import { Link } from "react-router-dom";
import { Session } from "../generated/graphql";
import { ActorLink } from "./ActorLink";
import { Location } from "./Location";
import { Remote } from "./Remote";
import { SessionDateTime } from "./SessionDateTime";
import { TimeStatus } from "./TimeStatus";

export function SessionCard({
  id,
  title,
  start,
  stop,
  textSnippet,
  hasMoreText,
  numberOfAttendees,
  attendeeLimit,
  isRemote,
  location,
  timeStatus,
  creator,
}: Session) {
  return (
    <article className="flex flex-col ml-1">
      <h2 className="text-2xl truncate ...">{title}</h2>
      <SessionDateTime
        start={start}
        stop={stop}
        ongoing={timeStatus === TimeStatus.ONGOING}
      />
      <p className="m-3 break-words">
        {textSnippet}
        {hasMoreText && (
          <>
            ...
            <Link
              to={`/session/${id}`}
              className="text-teal-500 hover:text-teal-400 ml-2"
            >
              read more
            </Link>
          </>
        )}
      </p>
      <div className="flex justify-between items-center">
        <ActorLink id={creator.id} name={creator.name} />
        <div className="self-end flex items-center">
          {isRemote && <Remote />}
          {location !== "" && <Location location={location} />}
          <div>
            <span>{numberOfAttendees}</span>
            <span>/</span>
            <span>{attendeeLimit}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
