import { useNavigate } from "react-router-dom";
import {
  Session,
  useJoinSessionMutation,
  useLeaveSessionMutation,
} from "../types/generatedTypes";
import { TimeStatus } from "./TimeStatus";

export interface JoinOrLeaveSessionProps {
  session: Session;
}

export function JoinOrLeaveSession({ session }: JoinOrLeaveSessionProps) {
  const navigate = useNavigate();

  const [, joinSession] = useJoinSessionMutation();
  const [, leaveSession] = useLeaveSessionMutation();

  const {
    id,
    numberOfAttendees,
    attendeeLimit,
    timeStatus,
    actorIsPartOfSession,
    isCancelled,
  } = session;

  const allowJoin = () => {
    const sessionHasSpots = numberOfAttendees < attendeeLimit;
    const isPast = timeStatus === TimeStatus.PAST;
    return !actorIsPartOfSession && sessionHasSpots && !isPast && !isCancelled;
  };

  if (allowJoin()) {
    return (
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
    );
  }

  const allowLeave = () => {
    return actorIsPartOfSession;
  };

  if (allowLeave()) {
    return (
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
    );
  }

  return <></>;
}

// TODO: put the logic from SessionCard/Details about not being the creator into the same
// validation file for checking if I am allowed to do a certain action
// or think about moving it to the backend
