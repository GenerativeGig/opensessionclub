import { Link } from "react-router-dom";
import { Session } from "../generated/graphql";
import { SessionDateTime } from "./SessionDateTime";

export function SessionCard({
  id,
  title,
  start,
  end,
  textSnippet,
  hasMoreText,
  numberOfAttendees,
  attendeeLimit,
  creator,
}: Session) {
  return (
    <article className="flex flex-col ml-1">
      <h1 className="text-2xl break-words">{title}</h1>
      <SessionDateTime start={start} end={end} />
      <p className="my-3 mx-1 break-words">
        {textSnippet}
        {hasMoreText && (
          <Link
            to={`/session/${id}`}
            className="text-teal-500 hover:text-teal-400 ml-4"
          >
            read more
          </Link>
        )}
      </p>
      <div className="flex justify-between items-center">
        <Link
          className="text-blue-500 hover:text-blue-400"
          to={`/actor/${creator.id}`}
        >
          {creator.name}
        </Link>
        <div className="self-end flex items-center">
          <div>
            <span>{numberOfAttendees}</span>
            <span>/</span>
            <span>{attendeeLimit}</span>
          </div>
          <Link to={`/session/${id}`}>
            <button className="bg-teal-500 hover:bg-teal-400">Read More</button>
          </Link>
        </div>
      </div>
    </article>
  );
}
// If not logged in -> Join Session -> Login page

// instead of modal a page for the session

// Clicking read more opens a modal with the full text (if not already joined then no comment section)
// Clicking Join Session opens a modal with all the information and the comment section where you can add comments
// After joining -> Button text is Open Session (or something similar)
