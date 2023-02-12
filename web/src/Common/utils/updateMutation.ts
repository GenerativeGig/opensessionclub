import { Cache } from "@urql/exchange-graphcache";
import {
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  SignupMutation,
} from "../../generatedTypes";
import { betterUpdateQuery } from "./betterUpdateQuery";

export const updateMutation = {
  signup: (result_: any, _args: any, cache: Cache, _info: any) => {
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
  login: (result_: any, _args: any, cache: Cache, _info: any) => {
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
  logout: (result_: any, _args: any, cache: Cache, _info: any) => {
    betterUpdateQuery<LogoutMutation, MeQuery>(
      cache,
      { query: MeDocument },
      result_,
      () => ({ me: null })
    );
  },
};
