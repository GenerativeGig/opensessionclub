import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider as UrqlProvider } from "urql";
import { ActorDetails } from "./routes/ActorDetails";
import { ChangePassword } from "./routes/ChangePassword";
import { CreateSession } from "./routes/CreateSession";
import { EditSession } from "./routes/EditSession";
import { Error } from "./routes/Error";
import { ForgotPassword } from "./routes/ForgotPassword";
import { Home } from "./routes/Home";
import { Login } from "./routes/Login";
import { OngoingSessions } from "./routes/OngoingSessions";
import { PastSessions } from "./routes/PastSessions";
import { SessionDetails } from "./routes/SessionDetails";
import { Sessions } from "./routes/Sessions";
import { Signup } from "./routes/Signup";
import { UpcomingSessions } from "./routes/UpcomingSessions";
import { Wrapper } from "./routes/Wrapper";
import { urqlClient } from "./utils/urqlClient";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Wrapper />}>
      <Route path="" element={<Home />} />
      <Route path="sessions" element={<Sessions />}>
        <Route path="ongoing" element={<OngoingSessions />} />
        <Route path="upcoming" element={<UpcomingSessions />} />
        <Route path="archived" element={<PastSessions />} />
      </Route>
      <Route path="session" element={<SessionDetails />}>
        <Route path=":id" element={<SessionDetails />} />
      </Route>
      <Route path="session/:id/edit" element={<EditSession />} />
      <Route path="create-session" element={<CreateSession />} />
      <Route path="actor/:id" element={<ActorDetails />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="change-password/:token" element={<ChangePassword />} />
      <Route path="*" element={<Error />} />
    </Route>
  )
);

export function Root() {
  return (
    <UrqlProvider value={urqlClient}>
      <RouterProvider router={router} />
    </UrqlProvider>
  );
}
