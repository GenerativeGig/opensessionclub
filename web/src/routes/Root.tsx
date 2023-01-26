import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider as UrqlProvider } from "urql";
import { urqlClient } from "../utils/urqlClient";
import { ActorDetails } from "./actor/ActorDetails";
import { ChangePassword } from "./actor/ChangePassword";
import { ChangePasswordLoggedIn } from "./actor/ChangePasswordLoggedIn";
import { ForgotPassword } from "./actor/ForgotPassword";
import { Login } from "./actor/Login";
import { Signup } from "./actor/Signup";
import { Home } from "./common/Home";
import { Impressum } from "./common/Impressum";
import { PageNotFound } from "./common/PageNotFound";
import { PrivacyPolicy } from "./common/PrivacyPolicy";
import { TermsOfService } from "./common/TermsOfService";
import { Wrapper } from "./common/Wrapper";
import { CreateSession } from "./session/CreateSession";
import { OngoingSessions } from "./session/OngoingSessions";
import { PastSessions } from "./session/PastSessions";
import { SessionDetails } from "./session/SessionDetails";
import { Sessions } from "./session/Sessions";
import { UpcomingSessions } from "./session/UpcomingSessions";
import { UpdateSession } from "./session/UpdateSession";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Wrapper />}>
      <Route path="" element={<Home />} />
      <Route path="impressum" element={<Impressum />} />
      <Route path="terms-of-service" element={<TermsOfService />} />
      <Route path="privacy-policy" element={<PrivacyPolicy />} />
      <Route path="sessions" element={<Sessions />}>
        <Route path="ongoing" element={<OngoingSessions />} />
        <Route path="upcoming" element={<UpcomingSessions />} />
        <Route path="archived" element={<PastSessions />} />
      </Route>
      <Route path="session" element={<SessionDetails />}>
        <Route path=":id" element={<SessionDetails />} />
      </Route>
      <Route path="session/:id/edit" element={<UpdateSession />} />
      <Route path="create-session" element={<CreateSession />} />
      <Route path="actor/:id" element={<ActorDetails />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="change-password/:token" element={<ChangePassword />} />
      <Route path="change-password" element={<ChangePasswordLoggedIn />} />
      <Route path="*" element={<PageNotFound />} />
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
