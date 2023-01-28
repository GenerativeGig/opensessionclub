import { cacheExchange } from "@urql/exchange-graphcache";
import { redirect } from "react-router-dom";
import { createClient, dedupExchange, Exchange, fetchExchange } from "urql";
import { pipe, tap } from "wonka";
import { IS_PRODUCTION } from "../constants";
import {
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  SignupMutation,
} from "../generatedTypes";
import { betterUpdateQuery } from "./betterUpdateQuery";
import { cursorPagination } from "./cursorPagination";

const errorExchange: Exchange =
  ({ forward }) =>
  (ops$) => {
    return pipe(
      forward(ops$),
      tap(({ error }) => {
        if (error?.message.includes("not authenticated")) {
          redirect("/login");
        }
      })
    );
  };

export const urqlClient = createClient({
  url: IS_PRODUCTION
    ? "https://opensession.club/graphql"
    : "http://localhost:4000/graphql",
  fetchOptions: { credentials: "include" as const },
  exchanges: [
    dedupExchange,
    cacheExchange({
      keys: {
        PaginatedOngoingSessions: () => null,
        PaginatedUpcomingSessions: () => null,
        PaginatedPastSessions: () => null,
      },
      resolvers: {
        Query: {
          ongoingSessions: cursorPagination("PaginatedOngoingSessions"),
          upcomingSessions: cursorPagination("PaginatedUpcomingSessions"),
          pastSessions: cursorPagination("PaginatedPastSessions"),
        },
      },
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
    errorExchange,
    fetchExchange,
  ],
});
