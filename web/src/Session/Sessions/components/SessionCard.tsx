import { AtSymbolIcon } from "@heroicons/react/24/solid";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Cancelled } from "../../Common/components/Cancelled";
import { Location } from "../../Common/components/Location";
import { NumberOfAttendees } from "../../Common/components/NumberOfAttendees";
import { Remote } from "../../Common/components/Remote";
import {
  SessionDateTime,
  SessionDateTimeKind,
} from "../../Common/components/SessionDateTime";
import { TimeStatus } from "../../Common/components/TimeStatus";
import { Session } from "../../generatedTypes";

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
        <h2 className="... truncate text-2xl">{title}</h2>
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
      <EditorContent editor={editor} />
      {hasMoreText && (
        <div className="ml-2 self-end text-teal-500 hover:text-teal-400">
          read more
        </div>
      )}
      <div className="flex items-center justify-between">
        <div className="...  truncate text-blue-500">
          <AtSymbolIcon className="inline h-5 w-5  fill-blue-500" />
          {creator.name}
        </div>
        <div className="flex items-center justify-around self-end">
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
