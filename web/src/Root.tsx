import {
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import { CreateSession } from "./routes/CreateSession";
import { EditSession } from "./routes/EditSession";
import { Error } from "./routes/Error";
import { Home } from "./routes/Home";
import { Login } from "./routes/Login";
import { Signup } from "./routes/Signup";
import { Sessions } from "./routes/Sessions";
import { Wrapper } from "./components/Wrapper";
import { urqlClient } from "./utils/urqlClient";
import { Provider as UrqlProvider } from "urql";
import { ChangePassword } from "./routes/ChangePassword";
import { ForgotPassword } from "./routes/ForgotPassword";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Wrapper />}>
      <Route path="/" element={<Home />} />
      <Route path="/sessions" element={<Sessions />} />
      <Route path="/session/create" element={<CreateSession />} />
      <Route path="/session/:sessionId/edit" element={<EditSession />} />
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
