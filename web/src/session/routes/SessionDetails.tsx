import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ActorLink } from "../../actor/components/ActorLink";
import { DataProvider } from "../../common/components/DataProvider";
import { RouteTitle } from "../../common/components/RouteTitle";
import { useAuthentication } from "../../common/hooks/useAuthentication";
import { useIdParam } from "../../common/hooks/useIdParam";
import { PageNotFound } from "../../common/routes/PageNotFound";
import { useSessionQuery } from "../../generatedTypes";
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
  const { me } = useAuthentication();

  const { id } = useIdParam();
  if (!id) {
    return <PageNotFound />;
  }

  const editor = useEditor({
    extensions: [StarterKit],
    editable: false,
    editorProps: { attributes: { class: "p-4" } },
  });

  return (
    <DataProvider useQuery={useSessionQuery} variables={{ id }}>
      {(data) => {
        if (!data.session) {
          return <PageNotFound />;
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
        } = data.session;

        const isCreator = me?.id === creator.id;

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
                  session={data.session}
                  isCreator={isCreator}
                />
              </div>
            </div>
            {actorIsPartOfSession && (
              <SessionCommentSection sessionId={id} me={me} />
            )}
          </article>
        );
      }}
    </DataProvider>
  );
}

// TODO: Add button to add to calendar automatically if part of session
// TODO: Move all permissions checks for buttons to the backend
