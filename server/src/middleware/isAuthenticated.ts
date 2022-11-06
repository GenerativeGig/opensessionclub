import { MiddlewareFn } from "type-graphql";
import { ApolloContext } from "../types";

export const isAuthenticated: MiddlewareFn<ApolloContext> = (
  { context },
  next
) => {
  if (!context.req.session.actorId) {
    throw new Error("not authenticated");
  }
  return next();
};
