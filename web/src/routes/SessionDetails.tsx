import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useParams } from "react-router-dom";
import { ActorLink } from "../components/ActorLink";
import { Cancelled } from "../components/Cancelled";
import { FailedLoadingData } from "../components/FailedLoadingData";
import { Loading } from "../components/Loading";
import { Location } from "../components/Location";
import { NumberOfAttendees } from "../components/NumberOfAttendees";
import { Remote } from "../components/Remote";
import { RouteTitle } from "../components/RouteTitle";
import { SessionCommentSection } from "../components/SessionCommentSection";
import {
  SessionDateTime,
  SessionDateTimeKind,
} from "../components/SessionDateTime";
import { SessionDetailsButtons } from "../components/SessionDetailsButtons";
import { TimeStatusTag } from "../components/TimeStatus";
import { useMeQuery, useSessionQuery } from "../types/generatedTypes";
import { useIsAuthenticated } from "../utils/useIsAuthenticated";
import { Error } from "./Error";

export function SessionDetails() {
  useIsAuthenticated();

  const { id } = useParams();
  if (!id) {
    return <FailedLoadingData />;
  }

  const [{ data: sessionData, fetching: sessionFetching }] = useSessionQuery({
    variables: { id: parseInt(id!) },
  });

  const [{ data: meData, fetching: meFetching }] = useMeQuery();

  const editor = useEditor({
    extensions: [StarterKit],
    editable: false,
    editorProps: { attributes: { class: "p-4" } },
  });

  if ((!sessionData && sessionFetching) || (!meData && meFetching)) {
    return <Loading />;
  }

  if ((!sessionData && !sessionFetching) || (!meData && !meFetching)) {
    return <FailedLoadingData />;
  }

  if (sessionData && !sessionFetching && meData && !meFetching) {
    if (!sessionData.session) {
      return <Error />;
    }

    if (!meData.me) {
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
      isCancelled,
      location,
      actorIsPartOfSession,
      timeStatus,
      creator,
    } = sessionData.session;

    const isCreator = meData?.me?.id === creator.id;

    editor?.commands.setContent(text || null);

    return (
      <article className="flex flex-col m-2">
        <RouteTitle>{title}</RouteTitle>
        {isRemote && (
          <div className="self-end">
            <Remote />
          </div>
        )}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            {isCancelled && (
              <>
                <Cancelled />
                <div className="h-1"></div>
              </>
            )}
            <TimeStatusTag timeStatus={timeStatus} />
          </div>
          <SessionDateTime
            start={start}
            stop={stop}
            kind={SessionDateTimeKind.Full}
          />
        </div>
        <EditorContent editor={editor} />
        <div className="self-end flex">
          {location && <Location location={location} />}
          <NumberOfAttendees
            numberOfAttendees={numberOfAttendees}
            attendeeLimit={attendeeLimit}
          />
        </div>
        <div className="flex justify-between items-center">
          <ActorLink actor={creator} />
          <div className="self-end flex flex-col md:flex-row items-end md:items-center">
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

// TODO: Add button to add to calendar automatically if part of session
// TODO: Move all permissions checks for buttons to the backend
