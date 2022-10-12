import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Session,
  SessionCommunicationMode,
  SessionFormat,
} from "../interfaces/Session";
import { CreateSessionView } from "./CreateSession/CreateSession";
import { EditSessionView } from "./EditSession/EditSession";
import { ErrorView } from "./Error";
import { FooterView } from "./Footer";
import { HeaderView } from "./Header";
import { HomeView } from "./Home/Home";
import { LoginView } from "./Login/Login";
import { SignupView } from "./Login/Signup";
import { SessionListView } from "./SessionList";

const sessions: Session[] = [
  {
    id: "1",
    titel: "Test title",
    description: "Test description",
    startDate: new Date(),
    endDate: new Date(),
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
  {
    id: "2",
    titel: "Test title",
    description: "Test description",
    startDate: new Date(),
    endDate: new Date(),
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
  {
    id: "3",
    titel: "Test title",
    description: "Test description",
    startDate: new Date(),
    endDate: new Date(),
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
  {
    id: "4",
    titel: "Test title",
    description: "Test description",
    startDate: new Date(),
    endDate: new Date(),
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
  {
    id: "5",
    titel: "Test title",
    description: "Test description",
    startDate: new Date(),
    endDate: new Date(),
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
  {
    id: "6",
    titel: "Test title",
    description:
      "Test description is very long. lOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOk here. Test description is very long. lOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOk here. Test description is very long. lOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOk here.",
    startDate: new Date(),
    endDate: new Date(),
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
      <div className="flex flex-col h-screen">
        <HeaderView />
        <main className="bg-slate-900 flex flex-grow">
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route
              path="/sessions"
              element={<SessionListView sessions={sessions} />}
            />
            <Route path="/session/create" element={<CreateSessionView />} />
            <Route
              path="/session/:sessionId/edit"
              element={<EditSessionView />}
            />
            <Route path="/login" element={<LoginView />} />
            <Route path="/signup" element={<SignupView />} />
            <Route path="*" element={<ErrorView />} />
          </Routes>
        </main>
        <FooterView />
      </div>
    </BrowserRouter>
  );
}
