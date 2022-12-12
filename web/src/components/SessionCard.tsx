import { Link } from "react-router-dom";
import { Session } from "../generated/graphql";
import { ActorLink } from "./ActorLink";
import { Cancelled } from "./Cancelled";
import { Location } from "./Location";
import { NumberOfAttendees } from "./NumberOfAttendees";
import { Remote } from "./Remote";
import { SessionDateTime, SessionDateTimeKind } from "./SessionDateTime";
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
  isCancelled,
  location,
  timeStatus,
  creator,
}: Session) {
  return (
    <article className="flex flex-col">
      <div className="flex justify-between">
        <h2 className="text-2xl truncate ...">{title}</h2>
        <div className="flex">
          {isCancelled && (
            <>
              <Cancelled />
              <div className="w-1"></div>
            </>
          )}
          {isRemote && <Remote />}
        </div>
      </div>
      <SessionDateTime
        start={start}
        stop={stop}
        kind={
          timeStatus === TimeStatus.ONGOING
            ? SessionDateTimeKind.Ongoing
            : SessionDateTimeKind.Compact
        }
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
        <ActorLink actor={creator} />
        <div className="self-end flex items-center justify-around">
          {location !== "" && <Location location={location} />}
          <NumberOfAttendees
            numberOfAttendees={numberOfAttendees}
            attendeeLimit={attendeeLimit}
          />
        </div>
      </div>
    </article>
  );
}
