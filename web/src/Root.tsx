import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider as UrqlProvider } from "urql";
import { ActorDetails } from "./components/ActorDetails";
import { Wrapper } from "./components/Wrapper";
import { ChangePassword } from "./routes/ChangePassword";
import { CreateSession } from "./routes/CreateSession";
import { EditSession } from "./routes/EditSession";
import { Error } from "./routes/Error";
import { ForgotPassword } from "./routes/ForgotPassword";
import { Home } from "./routes/Home";
import { Login } from "./routes/Login";
import { SessionDetails } from "./routes/SessionDetails";
import { Sessions } from "./routes/Sessions";
import { Signup } from "./routes/Signup";
import { urqlClient } from "./utils/urqlClient";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Wrapper />}>
      <Route path="/" element={<Home />} />
      <Route path="/sessions" element={<Sessions />} />
      <Route path="/session/:id" element={<SessionDetails />} />
      <Route path="/session/create" element={<CreateSession />} />
      <Route path="/session/:id/edit" element={<EditSession />} />
      <Route path="/actor/:id" element={<ActorDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/change-password/:token" element={<ChangePassword />} />
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
