import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CreateSession } from "./routes/CreateSession";
import { EditSession } from "./routes/EditSession";
import { Error } from "./routes/Error";
import { Home } from "./routes/Home";
import { Login } from "./routes/Login";
import { Signup } from "./routes/Signup";
import { Sessions } from "./routes/Sessions";
import { Wrapper } from "./components/Wrapper";
import { urqlClient } from "./utils/urqlClient";
import { Provider } from "urql";

export function Root() {
  return (
    <Provider value={urqlClient}>
      <BrowserRouter>
        <Wrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/session/create" element={<CreateSession />} />
            <Route path="/session/:sessionId/edit" element={<EditSession />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Wrapper>
      </BrowserRouter>
    </Provider>
  );
}
