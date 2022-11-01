import { createClient, dedupExchange, fetchExchange } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";
import {
  SignupMutation,
  MeQuery,
  MeDocument,
  LoginMutation,
  LogoutMutation,
} from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";

export const urqlClient = createClient({
  url: "http://localhost:4000/graphql",
  fetchOptions: { credentials: "include" as const },
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
