import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Session,
  SessionCommunicationMode,
  SessionFormat,
} from "../interfaces/Session";
import { CreateSessionView } from "./CreateSession/CreateSession";
import { ErrorView } from "./Error";
import { FooterView } from "./Footer";
import { HeaderView } from "./Header";
import { SessionListView } from "./SessionList";

const sessions: Session[] = [
  {
    id: "1",
    titel: "Test title",
    description: "Test description",
    startTime: new Date(),
    endTime: new Date(),
    languages: [
      { code: "en", name: "English", nativeName: "English" },
      { code: "se", name: "Indian", nativeName: "भारतीय" },
    ],
    communicationModes: [
      SessionCommunicationMode.Text,
      SessionCommunicationMode.Speech,
    ],
    formats: [SessionFormat.DeepDive, SessionFormat.Dialog],
    participantLimit: 3,
    participants: [{ name: "GenerativeGig" }, { name: "Test participant" }],
    creator: { name: "GenerativeGig" },
    chat: {},
    notes: [],
  },
];

export function RootView() {
  return (
    <BrowserRouter>
      <HeaderView />
      <main>
        <Routes>
          <Route path="/" element={<SessionListView sessions={sessions} />} />
          <Route path="/session/create" element={<CreateSessionView />} />
          <Route path="*" element={<ErrorView />} />
        </Routes>
      </main>
      <FooterView />
    </BrowserRouter>
  );
}
