import {
  PencilIcon,
  SpeakerWaveIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { DISCORD_CLIENT_ID } from "../constants";
import {
  Session,
  useDeleteSessionMutation,
  useJoinSessionVoiceChannelMutation,
} from "../generated/graphql";
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
  const [, joinVoiceChannel] = useJoinSessionVoiceChannelMutation();

  const { id, isRemote, actorIsPartOfSession, voiceChannelUrl } = session;

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
            <TrashIcon className="h-5 w-5 inline" />
            Delete
          </button>
          <Link to={`/session/${id}/edit`}>
            <button className="bg-yellow-500 hover:bg-yellow-400">
              <PencilIcon className="h-5 w-5 inline" />
              Edit
            </button>
          </Link>
        </div>
      ) : (
        <JoinOrLeaveSession session={session} />
      )}
      {actorIsPartOfSession && isRemote && (
        <button
          onClick={async () => {
            const response = await joinVoiceChannel({ id });
            if (!response.data?.joinSessionVoiceChannel) {
              if (DISCORD_CLIENT_ID === "undefined") {
                console.error("DISCORD_CLIENT_ID is undefined");
                return;
              }

              window.location.replace(
                `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=http%3A%2F%2Flocalhost%3A4000%2Fdiscord-authorization&response_type=code&scope=identify`
              );
            }
            if (!voiceChannelUrl) {
              console.error("voiceChannelUrl is undefined");
              return;
            }
            window.location.replace(voiceChannelUrl);
          }}
          className="bg-[#5865F2] hover:bg-[#7983f2]"
        >
          <SpeakerWaveIcon className="w-6 h-6 inline" />
          Join Voice Channel
        </button>
      )}
    </>
  );
}
