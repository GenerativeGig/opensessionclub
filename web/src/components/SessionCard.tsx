import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Link } from "react-router-dom";
import { Session } from "../generated/graphql";
import { ActorLink } from "./ActorLink";
import { Cancelled } from "./Cancelled";
import { Location } from "./Location";
import { NumberOfAttendees } from "./NumberOfAttendees";
import { Remote } from "./Remote";
import { SessionDateTime, SessionDateTimeKind } from "./SessionDateTime";
import { TimeStatus } from "./TimeStatus";

export function SessionCard({
  id,
  title,
  start,
  stop,
  textSnippet,
  hasMoreText,
  numberOfAttendees,
  attendeeLimit,
  isRemote,
  isCancelled,
  location,
  timeStatus,
  creator,
}: Session) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: textSnippet,
    editable: false,
    editorProps: { attributes: { class: "p-4" } },
  });

  return (
    <article className="flex flex-col">
      <div className="flex justify-between">
        <h2 className="text-2xl truncate ...">{title}</h2>
        <div className="flex">
          {isCancelled && (
            <>
              <Cancelled />
              <div className="w-1"></div>
            </>
          )}
          {isRemote && <Remote />}
        </div>
      </div>
      <SessionDateTime
        start={start}
        stop={stop}
        kind={
          timeStatus === TimeStatus.ONGOING
            ? SessionDateTimeKind.Ongoing
            : SessionDateTimeKind.Compact
        }
      />
      <p className="flex flex-col">
        <EditorContent editor={editor} />
        {hasMoreText && (
          <Link
            to={`/session/${id}`}
            className="text-teal-500 hover:text-teal-400 ml-2 self-end"
          >
            read more
          </Link>
        )}
      </p>
      <div className="flex justify-between items-center">
        <ActorLink actor={creator} />
        <div className="self-end flex items-center justify-around">
          {location && <Location location={location} />}
          <NumberOfAttendees
            numberOfAttendees={numberOfAttendees}
            attendeeLimit={attendeeLimit}
          />
        </div>
      </div>
    </article>
  );
}

// TODO: Make it obvious which sessions you are apart of (visually)
