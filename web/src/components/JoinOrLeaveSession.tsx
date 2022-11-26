import { useNavigate } from "react-router-dom";
import {
  useJoinSessionMutation,
  useLeaveSessionMutation,
} from "../generated/graphql";
import { TimeStatus } from "./TimeStatus";

export interface JoinOrLeaveSessionProps {
  sessionId: number;
  actorIsPartOfSession: boolean;
  timeStatus: string;
}

export function JoinOrLeaveSession({
  actorIsPartOfSession,
  sessionId,
  timeStatus,
}: JoinOrLeaveSessionProps) {
  const navigate = useNavigate();

  const [, joinSession] = useJoinSessionMutation();
  const [, leaveSession] = useLeaveSessionMutation();

  if (!actorIsPartOfSession && timeStatus === TimeStatus.PAST) {
    return <></>;
  }

  return (
    <>
      {!actorIsPartOfSession ? (
        <button
          onClick={async () => {
            const response = await joinSession({ id: sessionId });
            if (response.data?.joinSession) {
              navigate(0);
            }
          }}
          className="bg-green-500 hover:bg-green-400"
        >
          Join
        </button>
      ) : (
        <button
          onClick={async () => {
            const response = await leaveSession({ id: sessionId });
            if (response.data?.leaveSession) {
              navigate(0);
            }
          }}
          className="bg-red-500 hover:bg-red-400"
        >
          Leave
        </button>
      )}
    </>
  );
}
