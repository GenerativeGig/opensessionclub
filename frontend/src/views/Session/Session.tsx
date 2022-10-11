import { Session } from "../../interfaces/Session";
import { SessionCommunicationModeListView } from "./SessionCommunicationModeList";
import { SessionDateTimeView } from "./SessionDateTime";
import { SessionFormatListView } from "./SessionFormatList";
import { SessionLanguageListView } from "./SessionLanguageList";

export interface SessionProps {
  session: Session;
}

export function SessionView({ session }: SessionProps) {
  return (
    <article className="flex flex-col ml-1">
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl">{session.titel}</h1>
        </div>
        <div className="flex flex-col items-end mr-1">
          <SessionDateTimeView
            startTime={session.startTime}
            endTime={session.endTime}
          />
          <SessionLanguageListView languages={session.languages} />
        </div>
      </div>
      <p className="my-3 mr-1">{session.description}</p>
      <div className="flex justify-between">
        <div>
          <SessionCommunicationModeListView
            communicationModes={session.communicationModes}
          />
          <SessionFormatListView formats={session.formats} />
        </div>
        <div className="flex items-center">
          <div>
            <span>{session.participants.length}</span>
            <span>/</span>
            <span>{session.participantLimit}</span>
          </div>
          <button type="submit" className="bg-green-500 hover:bg-green-400">
            Join Session
          </button>
        </div>
      </div>
    </article>
  );
}
