import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider as UrqlProvider } from "urql";
import { ActorDetails } from "./Actor/ActorDetails/routes/ActorDetails";
import { ChangePassword } from "./Actor/Common/routes/ChangePassword";
import { ChangePasswordLoggedIn } from "./Actor/Common/routes/ChangePasswordLoggedIn";
import { ForgotPassword } from "./Actor/Common/routes/ForgotPassword";
import { Login } from "./Actor/Common/routes/Login";
import { Signup } from "./Actor/Common/routes/Signup";
import { Home } from "./Common/routes/Home";
import { Impressum } from "./Common/routes/Impressum";
import { PageNotFound } from "./Common/routes/PageNotFound";
import { PrivacyPolicy } from "./Common/routes/PrivacyPolicy";
import { TermsOfService } from "./Common/routes/TermsOfService";
import { Wrapper } from "./Common/routes/Wrapper";
import { urqlClient } from "./Common/utils/urqlClient";
import { CreateSession } from "./Session/Common/routes/CreateSession";
import { UpdateSession } from "./Session/Common/routes/UpdateSession";
import { SessionDetails } from "./Session/SessionDetails/routes/SessionDetails";
import { OngoingSessions } from "./Session/Sessions/routes/OngoingSessions";
import { PastSessions } from "./Session/Sessions/routes/PastSessions";
import { Sessions } from "./Session/Sessions/routes/Sessions";
import { UpcomingSessions } from "./Session/Sessions/routes/UpcomingSessions";

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
