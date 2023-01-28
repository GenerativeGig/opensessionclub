import {
  NoSymbolIcon,
  PencilIcon,
  SpeakerWaveIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useIsAuthenticated } from "../../common/hooks/useIsAuthenticated";
import { DISCORD_AUTH_URL } from "../../constants";
import {
  Session,
  useCancelSessionMutation,
  useDeleteSessionMutation,
  useJoinSessionVoiceChannelMutation,
} from "../../generatedTypes";
import { JoinOrLeaveSession } from "./JoinOrLeaveSession";
import { TimeStatus } from "./TimeStatus";

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

  const [, cancelSession] = useCancelSessionMutation();
  const [, deleteSession] = useDeleteSessionMutation();
  const [, joinVoiceChannel] = useJoinSessionVoiceChannelMutation();

  const { id, isCancelled, actorIsPartOfSession, voiceChannelUrl, timeStatus } =
    session;

  const isPast = timeStatus === TimeStatus.PAST;

  const [canJoinVoiceChannel, setCanJoinVoiceChannel] = useState<
    boolean | undefined
  >();
  const [joinVoiceChannelText, setJoinVoiceChannelText] =
    useState<string>("Join Voice Channel");

  const refreshCanJoinVoiceChannel = async () => {
    setCanJoinVoiceChannel(
      (await joinVoiceChannel({ id })).data?.joinSessionVoiceChannel
    );
  };

  useEffect(() => {
    refreshCanJoinVoiceChannel();
  }, []);

  return (
    <>
      {isCreator ? (
        <>
          {!isCancelled && !isPast && (
            <button
              className="bg-rose-400 hover:bg-rose-300"
              onClick={async () => {
                const response = await cancelSession({ id });
                if (response.data?.cancelSession) {
                  navigate(0);
                }
              }}
            >
              <NoSymbolIcon className="h-6 w-6 inline" />
              Cancel
            </button>
          )}
          <button
            className="bg-red-500 hover:bg-red-400"
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
          {!isCancelled && !isPast && (
            <Link to={`/session/${id}/edit`}>
              <button className="bg-yellow-500 hover:bg-yellow-400">
                <PencilIcon className="h-5 w-5 inline" />
                Edit
              </button>
            </Link>
          )}
        </>
      ) : (
        <JoinOrLeaveSession session={session} />
      )}
      {actorIsPartOfSession && !isPast && voiceChannelUrl && (
        <button
          onClick={() => {
            if (!canJoinVoiceChannel) {
              if (DISCORD_AUTH_URL === "undefined") {
                console.error("DISCORD_AUTH_URL is undefined");
                return;
              }
              window.open(DISCORD_AUTH_URL);
              setJoinVoiceChannelText("Please refresh the page");
            } else {
              window.open(voiceChannelUrl);
            }

            refreshCanJoinVoiceChannel().then(() => {
              if (!canJoinVoiceChannel) {
                console.error("Unable to join voice channel");
              }

              window.open(voiceChannelUrl);
            });
          }}
          className="bg-[#5865F2] hover:bg-[#7983f2]"
        >
          <SpeakerWaveIcon className="w-6 h-6 inline" />
          {joinVoiceChannelText}
        </button>
      )}
    </>
  );
}

// TODO: how to not have to implement same permission logic in frontend and backend?

// Add field resolvers for permissions to Session/SessionComment
// List of Action Permissions UPDATE DELETE CANCEL JoinVoice Join Leave Session
// List of Action Permissions UPDATE DELETE SessionComment
// if Permission is not o

// On client only implement logic for when to show using one boolean
// On server return extra booleans if needed to make it easier on the client

// TODO: After authentication open discord invite link instead of going to home page
