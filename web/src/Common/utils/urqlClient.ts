import { cacheExchange } from "@urql/exchange-graphcache";
import { redirect } from "react-router-dom";
import { createClient, dedupExchange, Exchange, fetchExchange } from "urql";
import { pipe, tap } from "wonka";
import { IS_PRODUCTION } from "../../constants";
import { cursorPagination } from "./cursorPagination";
import { updateMutation } from "./updateMutation";

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
        Mutation: updateMutation,
      },
    }),
    errorExchange,
    fetchExchange,
  ],
});
