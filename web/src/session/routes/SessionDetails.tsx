import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useParams } from "react-router-dom";
import { ActorLink } from "../../actor/components/ActorLink";
import { FailedLoadingData } from "../../common/components/FailedLoadingData";
import { Loading } from "../../common/components/Loading";
import { RouteTitle } from "../../common/components/RouteTitle";
import { useAuthentication } from "../../common/hooks/useAuthentication";
import { PageNotFound } from "../../common/routes/PageNotFound";
import { useMeQuery, useSessionQuery } from "../../generatedTypes";
import { SessionCommentSection } from "../../sessionComments/components/SessionCommentSection";
import { Cancelled } from "../components/Cancelled";
import { Location } from "../components/Location";
import { NumberOfAttendees } from "../components/NumberOfAttendees";
import { Remote } from "../components/Remote";
import {
  SessionDateTime,
  SessionDateTimeKind,
} from "../components/SessionDateTime";
import { SessionDetailsButtons } from "../components/SessionDetailsButtons";
import { TimeStatusTag } from "../components/TimeStatus";

export function SessionDetails() {
  useAuthentication();

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
      return <PageNotFound />;
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
      <article className="m-2 flex flex-col">
        <RouteTitle>{title}</RouteTitle>
        {isRemote && (
          <div className="self-end">
            <Remote />
          </div>
        )}
        <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
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
        <div className="flex self-end">
          {location && <Location location={location} />}
          <NumberOfAttendees
            numberOfAttendees={numberOfAttendees}
            attendeeLimit={attendeeLimit}
          />
        </div>
        <div className="flex items-center justify-between">
          <ActorLink actor={creator} />
          <div className="flex flex-col items-end self-end md:flex-row md:items-center">
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
