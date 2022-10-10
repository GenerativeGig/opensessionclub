import { Session } from "../../interfaces/Session";
import { SessionCommunicationModeView } from "./SessionCommunicationMode";
import { SessionFormatView } from "./SessionFormat";

export interface SessionProps {
  session: Session;
}

export function SessionView({ session }: SessionProps) {
  return (
    <article>
      <h1>{session.titel}</h1>
      <p>{session.description}</p>
      <time>
        {
          /** TODO: Component for rendering date and time*/ session.startTime.getDate()
        }
      </time>
      <div>
        {
          /** TODO: Component for rendering langauges as flags*/
          session.languages[0].name
        }
      </div>
      <SessionCommunicationModeView
        communicationModes={session.communicationModes}
      />
      <SessionFormatView formats={session.formats} />
      <div>
        <span>{session.participants.length}</span>
        <span>/</span>
        <span>{session.participantLimit}</span>
      </div>
      <button type="submit">Join Session</button>
    </article>
  );
}
