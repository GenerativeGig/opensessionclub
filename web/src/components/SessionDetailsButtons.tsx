import { Link, useNavigate } from "react-router-dom";
import { Session, useDeleteSessionMutation } from "../generated/graphql";
import { useIsAuthenticated } from "../utils/useIsAuthenticated";
import { JoinOrLeaveSession } from "./JoinOrLeaveSession";

export interface SessionDetailsButtonsProps {
  session: Session;
  isCreator: boolean;
}

export function SessionDetailsButtons({
  session,
  isCreator,
}: SessionDetailsButtonsProps) {
  useIsAuthenticated();

  const navigate = useNavigate();

  const [, deleteSession] = useDeleteSessionMutation();

  const {
    id,
    attendeeLimit,
    numberOfAttendees,
    actorIsPartOfSession,
    timeStatus,
  } = session;

  return (
    <>
      {isCreator ? (
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
            <button className="bg-yellow-500 hover:bg-yellow-400">Edit</button>
          </Link>
        </div>
      ) : (
        <JoinOrLeaveSession
          sessionId={id}
          attendeeLimit={attendeeLimit}
          numberOfAttendees={numberOfAttendees}
          actorIsPartOfSession={actorIsPartOfSession}
          timeStatus={timeStatus}
        />
      )}
    </>
  );
}
