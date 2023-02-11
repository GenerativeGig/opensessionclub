import { SpeakerWaveIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useAuthentication } from "../../../Common/hooks/useAuthentication";
import { DISCORD_AUTH_URL } from "../../../constants";
import {
  Session,
  useJoinSessionVoiceChannelMutation,
} from "../../../generatedTypes";
import { TimeStatus } from "../../Common/components/TimeStatus";
import { JoinOrLeaveSession } from "./JoinOrLeaveSession";
import { SessionDetailsCreatorButtons } from "./SessionDetailsCreatorButtons";

export interface SessionDetailsButtonsProps {
  session: Session;
  isCreator: boolean;
}

export function SessionDetailsButtons({
  session,
  isCreator,
}: SessionDetailsButtonsProps) {
  useAuthentication();

  const [, joinVoiceChannel] = useJoinSessionVoiceChannelMutation();

  const { id, isCancelled, actorIsPartOfSession, voiceChannelUrl, timeStatus } =
    session;

  const isPast = timeStatus === TimeStatus.PAST;

  const canJoinVoiceChannelPrecondition = Boolean(
    actorIsPartOfSession && !isPast && voiceChannelUrl
  );

  const [canJoinVoiceChannel, setCanJoinVoiceChannel] = useState<
    boolean | undefined
  >();

  const [joinVoiceChannelText, setJoinVoiceChannelText] =
    useState<string>("Join Voice Channel");

  const refreshCanJoinVoiceChannel = async () => {
    setCanJoinVoiceChannel(
      canJoinVoiceChannelPrecondition &&
        (await joinVoiceChannel({ id })).data?.joinSessionVoiceChannel
    );
  };

  useEffect(() => {
    refreshCanJoinVoiceChannel();
  }, []);

  return (
    <>
      {isCreator && (
        <SessionDetailsCreatorButtons
          sessionId={id}
          isCancelled={isCancelled}
          isPast={isPast}
        />
      )}
      {!isCreator && <JoinOrLeaveSession session={session} />}
      {canJoinVoiceChannelPrecondition && (
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
              window.open(voiceChannelUrl!);
            }

            refreshCanJoinVoiceChannel().then(() => {
              if (!canJoinVoiceChannel) {
                console.error("Unable to join voice channel");
              }

              window.open(voiceChannelUrl!);
            });
          }}
          className="bg-[#5865F2] hover:bg-[#7983f2]"
        >
          <SpeakerWaveIcon className="inline h-6 w-6" />
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
