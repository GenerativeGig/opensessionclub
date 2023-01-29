import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider as UrqlProvider } from "urql";
import { ActorDetails } from "./actor/routes/ActorDetails";
import { ChangePassword } from "./actor/routes/ChangePassword";
import { ChangePasswordLoggedIn } from "./actor/routes/ChangePasswordLoggedIn";
import { ForgotPassword } from "./actor/routes/ForgotPassword";
import { Login } from "./actor/routes/Login";
import { Signup } from "./actor/routes/Signup";
import { Home } from "./common/routes/Home";
import { Impressum } from "./common/routes/Impressum";
import { PageNotFound } from "./common/routes/PageNotFound";
import { PrivacyPolicy } from "./common/routes/PrivacyPolicy";
import { TermsOfService } from "./common/routes/TermsOfService";
import { Wrapper } from "./common/routes/Wrapper";
import { CreateSession } from "./session/routes/CreateSession";
import { OngoingSessions } from "./session/routes/OngoingSessions";
import { PastSessions } from "./session/routes/PastSessions";
import { SessionDetails } from "./session/routes/SessionDetails";
import { Sessions } from "./session/routes/Sessions";
import { UpcomingSessions } from "./session/routes/UpcomingSessions";
import { UpdateSession } from "./session/routes/UpdateSession";
import { urqlClient } from "./utils/urqlClient";

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
