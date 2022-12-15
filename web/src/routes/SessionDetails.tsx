import { useParams } from "react-router-dom";
import { ActorLink } from "../components/ActorLink";
import { Cancelled } from "../components/Cancelled";
import { FailedLoadingData } from "../components/FailedLoadingData";
import { Loading } from "../components/Loading";
import { Location } from "../components/Location";
import { NumberOfAttendees } from "../components/NumberOfAttendees";
import { Remote } from "../components/Remote";
import { RouteTitle } from "../components/RouteTitle";
import { SessionCommentSection } from "../components/SessionCommentSection";
import {
  SessionDateTime,
  SessionDateTimeKind,
} from "../components/SessionDateTime";
import { SessionDetailsButtons } from "../components/SessionDetailsButtons";
import { TimeStatusTag } from "../components/TimeStatus";
import { useMeQuery, useSessionQuery } from "../generated/graphql";
import { useIsAuthenticated } from "../utils/useIsAuthenticated";

export function SessionDetails() {
  useIsAuthenticated();

  const { id } = useParams();
  if (!id) {
    return <FailedLoadingData />;
  }

  const [{ data: sessionData, fetching: sessionFetching }] = useSessionQuery({
    variables: { id: parseInt(id!) },
  });

  const [{ data: meData, fetching: meFetching }] = useMeQuery();

  if ((!sessionData && sessionFetching) || (!meData && meFetching)) {
    return <Loading />;
  }

  if ((!sessionData && !sessionFetching) || (!meData && !meFetching)) {
    return <FailedLoadingData />;
  }

  if (sessionData && !sessionFetching && meData && !meFetching) {
    if (!sessionData.session) {
      console.log("session is undefined");
      return <></>;
    }

    if (!meData.me) {
      console.log("me is undefined");
      return <></>;
    }

    const {
      id,
      title,
      start,
      stop,
      text,
      numberOfAttendees,
      attendeeLimit,
      isRemote,
      isCancelled,
      location,
      actorIsPartOfSession,
      timeStatus,
      creator,
    } = sessionData.session;

    const isCreator = meData?.me?.id === creator.id;

    return (
      <article className="flex flex-col">
        <div className="flex justify-between items-center">
          <RouteTitle>{title}</RouteTitle>
          {isRemote && <Remote />}
        </div>
        <div className="flex justify-between items-center">
          <div>
            {isCancelled && (
              <>
                <Cancelled />
                <div className="h-1"></div>
              </>
            )}
            <TimeStatusTag timeStatus={timeStatus} />
          </div>
          <SessionDateTime
            start={start}
            stop={stop}
            kind={SessionDateTimeKind.Full}
          />
        </div>
        <div className="my-3 mx-1 break-words">{text}</div>
        <div className="self-end flex">
          {location && <Location location={location} />}
          <NumberOfAttendees
            numberOfAttendees={numberOfAttendees}
            attendeeLimit={attendeeLimit}
          />
        </div>
        <div className="flex justify-between items-center">
          <ActorLink actor={creator} />
          <div className="self-end flex items-center">
            <SessionDetailsButtons
              session={sessionData.session}
              isCreator={isCreator}
            />
          </div>
        </div>
        {actorIsPartOfSession && (
          <SessionCommentSection sessionId={id} me={meData.me} />
        )}
      </article>
    );
  }
  return <></>;
}
