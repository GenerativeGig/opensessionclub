import { useParams } from "react-router-dom";
import { ssrExchange } from "urql";
import { ActorLink } from "../components/ActorLink";
import { FailedLoadingData } from "../components/FailedLoadingData";
import { Loading } from "../components/Loading";
import { Location } from "../components/Location";
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

export function SessionDetails() {
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
      location,
      actorIsPartOfSession,
      timeStatus,
      creator,
    } = sessionData.session;

    const isCreator = meData?.me?.id === creator.id;

    return (
      <article className="flex flex-col">
        <RouteTitle>{title}</RouteTitle>
        <div className="flex justify-between">
          <TimeStatusTag timeStatus={timeStatus} />
          <SessionDateTime
            start={start}
            stop={stop}
            kind={SessionDateTimeKind.Full}
          />
        </div>
        <div className="my-3 mx-1 break-words">{text}</div>
        <div className="flex justify-between items-center">
          <ActorLink actor={creator} />
          <div className="self-end flex items-center">
            {isRemote && <Remote />}
            {location !== "" && <Location location={location} />}
            <div>
              <span>{numberOfAttendees}</span>
              <span>/</span>
              <span>{attendeeLimit}</span>
            </div>
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

// TODO: comments are only returned from server if logged in and has joined session
// this is where contact information is usually added
// integrate discord into website -> meaning you can create a session
// with a corresponding discord chat room
