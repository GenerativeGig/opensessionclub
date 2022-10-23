import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Session } from "./interfaces/session.interface";
import { CreateSessionView } from "./routes/CreateSession";
import { EditSessionView } from "./routes/EditSession";
import { ErrorView } from "./routes/Error";
import { FooterView } from "./components/Footer";
import { HeaderView } from "./components/Header";
import { HomeView } from "./routes/Home";
import { LoginView } from "./routes/Login";
import { SignupView } from "./routes/Signup";
import { SessionsView } from "./routes/Sessions";

const sessions: Session[] = [
  {
    id: "1",
    titel: "Test title",
    description: "Test description",
    startDate: new Date(),
    endDate: new Date(),
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
              element={<SessionsView sessions={sessions} />}
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
