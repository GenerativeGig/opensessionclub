import { useNavigate } from "react-router-dom";
import {
  useJoinSessionMutation,
  useLeaveSessionMutation,
} from "../generated/graphql";

export interface JoinOrLeaveSessionProps {
  sessionId: number;
  actorIsPartOfSession: boolean;
}

export function JoinOrLeaveSession({
  actorIsPartOfSession,
  sessionId,
}: JoinOrLeaveSessionProps) {
  const navigate = useNavigate();

  const [, joinSession] = useJoinSessionMutation();
  const [, leaveSession] = useLeaveSessionMutation();

  return (
    <>
      {actorIsPartOfSession ? (
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
      ) : (
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
      )}
    </>
  );
}
