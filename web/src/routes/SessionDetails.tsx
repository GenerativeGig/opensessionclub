import { Link, useNavigate, useParams } from "react-router-dom";
import { ActorLink } from "../components/ActorLink";
import { CommentSection } from "../components/CommentSection";
import { FailedLoadingData } from "../components/FailedLoadingData";
import { JoinOrLeaveSession } from "../components/JoinOrLeaveSession";
import { Loading } from "../components/Loading";
import { Remote } from "../components/Remote";
import { Location } from "../components/Location";
import { RouteTitle } from "../components/RouteTitle";
import { SessionDateTime } from "../components/SessionDateTime";
import { TimeStatusTag } from "../components/TimeStatus";
import {
  useDeleteSessionMutation,
  useMeQuery,
  useSessionQuery,
} from "../generated/graphql";

export function SessionDetails() {
  const { id } = useParams();
  if (!id) {
    return <FailedLoadingData />;
  }

  const [{ data: sessionData, fetching: sessionFetching }] = useSessionQuery({
    variables: { id: parseInt(id!) },
  });

  const [{ data: meData, fetching: meFetching }] = useMeQuery();

  const navigate = useNavigate();

  const [, deleteSession] = useDeleteSessionMutation();

  if ((!sessionData && sessionFetching) || (!meData && meFetching)) {
    return <Loading />;
  }

  if ((!sessionData && !sessionFetching) || (!meData && !meFetching)) {
    return <FailedLoadingData />;
  }

  if (sessionData?.session) {
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

    return (
      <article className="flex flex-col">
        <RouteTitle>{title}</RouteTitle>
        <div className="flex justify-between">
          <TimeStatusTag timeStatus={timeStatus} />
          <SessionDateTime start={start} stop={stop} full />
        </div>
        <div className="my-3 mx-1 break-words">{text}</div>
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
            {creator.id === meData?.me?.id && (
              <div>
                <button
                  className="bg-red-500 hover-red-400"
                  onClick={async () => {
                    const response = await deleteSession({ id });
                    if (response.data?.deleteSession) {
                      navigate("/sessions");
                    }
                  }}
                >
                  Delete
                </button>
                <Link to={`/session/${id}/edit`}>
                  <button className="bg-yellow-500 hover:bg-yellow-400">
                    Edit
                  </button>
                </Link>
              </div>
            )}
            {meData?.me && creator.id !== meData?.me?.id && (
              <JoinOrLeaveSession
                sessionId={id}
                attendeeLimit={attendeeLimit}
                numberOfAttendees={numberOfAttendees}
                actorIsPartOfSession={actorIsPartOfSession}
                timeStatus={timeStatus}
              />
            )}
          </div>
        </div>
        {actorIsPartOfSession && <CommentSection />}
      </article>
    );
  }

  return <></>;
}

// TODO: comments are only returned from server if logged in and has joined session
// this is where contact information is usually added
// integrate discord into website -> meaning you can create a session
// with a corresponding discord chat room
