import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteTitle } from "../components/RouteTitle";
import { SessionDateTime } from "../components/SessionDateTime";
import {
  useDeleteSessionMutation,
  useJoinSessionMutation,
  useLeaveSessionMutation,
  useMeQuery,
  useSessionQuery,
} from "../generated/graphql";
import { useIsAuthenticated } from "../utils/useIsAuthenticated";

export function SessionDetails() {
  useIsAuthenticated();
  const { id } = useParams();
  if (!id) {
    useIsAuthenticated();
  }

  const [{ data: sessionData, fetching: sessionFetching }] = useSessionQuery({
    variables: { id: parseInt(id!) },
  });

  const [{ data: meData, fetching: meFetching }] = useMeQuery();

  const navigate = useNavigate();
  const [, joinSession] = useJoinSessionMutation();
  const [, leaveSession] = useLeaveSessionMutation();

  const [, deleteSession] = useDeleteSessionMutation();

  if ((!sessionData && sessionFetching) || (!meData && meFetching)) {
    return <span>Loading...</span>;
  }

  if (sessionData?.session && meData?.me) {
    const {
      id,
      title,
      start,
      end,
      text,
      numberOfAttendees,
      attendeeLimit,
      actorIsPartOfSession,
      timeStatus,
      creator,
    } = sessionData.session;

    function JoinOrLeaveButton() {
      return (
        <>
          {actorIsPartOfSession ? (
            <button
              onClick={async () => {
                const response = await leaveSession({ id });
                if (response.data?.leaveSession) {
                  navigate(0);
                }
              }}
              className="bg-red-500 hover:bg-red-400"
            >
              Leave
            </button>
          ) : (
            <button
              onClick={async () => {
                const response = await joinSession({ id });
                if (response.data?.joinSession) {
                  navigate(0);
                }
              }}
              className="bg-green-500 hover:bg-green-400"
            >
              Join
            </button>
          )}
        </>
      );
    }

    return (
      <article className="flex flex-col">
        <RouteTitle>{title}</RouteTitle>
        <SessionDateTime start={start} end={end} />
        <div className="my-3 mx-1 break-words">{text}</div>
        <div className="flex justify-between">
          <div>
            <Link
              className="text-blue-500 hover:text-blue-400"
              to={`/actor/${creator.id}`}
            >
              {creator.name}
            </Link>
            <span>{timeStatus}</span>
          </div>
          <div className="self-end flex items-center">
            <div>
              <span>{numberOfAttendees}</span>
              <span>/</span>
              <span>{attendeeLimit}</span>
            </div>
            {creator.id === meData.me.id ? (
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
                <button className="bg-yellow-500 hover:bg-yellow-400">
                  <Link to={`/sessions/${id}/edit`}>Edit</Link>
                </button>
              </div>
            ) : (
              <JoinOrLeaveButton />
            )}
          </div>
        </div>
      </article>
    );
  }

  return <p>Failed loading data.</p>;
}
