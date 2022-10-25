import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Session } from "./interfaces/session.interface";
import { CreateSession } from "./routes/CreateSession";
import { EditSession } from "./routes/EditSession";
import { Error } from "./routes/Error";
import { Home } from "./routes/Home";
import { Login } from "./routes/Login";
import { Signup } from "./routes/Signup";
import { Sessions } from "./routes/Sessions";
import { Wrapper } from "./components/Wrapper";
import { createClient, dedupExchange, fetchExchange, Provider } from "urql";
import { Cache, cacheExchange, QueryInput } from "@urql/exchange-graphcache";
import {
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  SignupMutation,
} from "./generated/graphql";

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

function betterUpdateQuery<Result, Query>(
  cache: Cache,
  queryInput: QueryInput,
  result: any,
  updateFunction: (result: Result, query: Query) => Query
) {
  return cache.updateQuery(
    queryInput,
    (data) => updateFunction(result, data as any) as any
  );
}

const client = createClient({
  url: "http://localhost:4000/graphql",
  fetchOptions: { credentials: "include" },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          signup: (result_, _args, cache, _info) => {
            betterUpdateQuery<SignupMutation, MeQuery>(
              cache,
              { query: MeDocument },
              result_,
              (result, query) => {
                if (result.signup.errors) {
                  return query;
                } else {
                  return { me: result.signup.actor };
                }
              }
            );
          },
          login: (result_, _args, cache, _info) => {
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache,
              { query: MeDocument },
              result_,
              (result, query) => {
                if (result.login.errors) {
                  return query;
                } else {
                  return { me: result.login.actor };
                }
              }
            );
          },
          logout: (result_, _args, cache, _info) => {
            betterUpdateQuery<LogoutMutation, MeQuery>(
              cache,
              { query: MeDocument },
              result_,
              () => ({ me: null })
            );
          },
        },
      },
    }),
    fetchExchange,
  ],
});

export function Root() {
  return (
    <Provider value={client}>
      <BrowserRouter>
        <Wrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/sessions"
              element={<Sessions sessions={sessions} />}
            />
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
