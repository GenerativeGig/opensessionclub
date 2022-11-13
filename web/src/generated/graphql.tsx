import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Actor = {
  __typename?: 'Actor';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type ActorResponse = {
  __typename?: 'ActorResponse';
  actor?: Maybe<Actor>;
  errors?: Maybe<Array<FieldError>>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: ActorResponse;
  createSession: Session;
  deleteSession: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  joinSession: Scalars['Boolean'];
  leaveSession: Scalars['Boolean'];
  login: ActorResponse;
  logout: Scalars['Boolean'];
  signup: ActorResponse;
  updateSession: Session;
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCreateSessionArgs = {
  input: SessionInput;
};


export type MutationDeleteSessionArgs = {
  id: Scalars['Int'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationJoinSessionArgs = {
  id: Scalars['Int'];
};


export type MutationLeaveSessionArgs = {
  id: Scalars['Int'];
};


export type MutationLoginArgs = {
  nameOrEmail: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSignupArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUpdateSessionArgs = {
  id: Scalars['Int'];
  input: SessionInput;
};

export type PaginatedSessions = {
  __typename?: 'PaginatedSessions';
  hasMore: Scalars['Boolean'];
  sessions: Array<Session>;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<Actor>;
  session?: Maybe<Session>;
  sessions: PaginatedSessions;
};


export type QuerySessionArgs = {
  id: Scalars['Int'];
};


export type QuerySessionsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
};

export type Session = {
  __typename?: 'Session';
  actorIsPartOfSession: Scalars['Boolean'];
  attendeeLimit: Scalars['Int'];
  createdAt: Scalars['String'];
  creator: Actor;
  creatorId: Scalars['Int'];
  end: Scalars['String'];
  hasMoreText: Scalars['Boolean'];
  id: Scalars['Int'];
  numberOfAttendees: Scalars['Int'];
  start: Scalars['String'];
  text: Scalars['String'];
  textSnippet: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type SessionInput = {
  attendeeLimit: Scalars['Float'];
  end: Scalars['DateTime'];
  start: Scalars['DateTime'];
  text: Scalars['String'];
  title: Scalars['String'];
};

export type BasicActorFragment = { __typename?: 'Actor', id: number, name: string };

export type BasicActorResponseFragment = { __typename?: 'ActorResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, actor?: { __typename?: 'Actor', id: number, name: string } | null };

export type BasicErrorFragment = { __typename?: 'FieldError', field: string, message: string };

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'ActorResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, actor?: { __typename?: 'Actor', id: number, name: string } | null } };

export type CreateSessionMutationVariables = Exact<{
  input: SessionInput;
}>;


export type CreateSessionMutation = { __typename?: 'Mutation', createSession: { __typename?: 'Session', id: number, title: string, text: string, start: string, end: string, attendeeLimit: number, creatorId: number, createdAt: string, updatedAt: string } };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type LoginMutationVariables = Exact<{
  nameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'ActorResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, actor?: { __typename?: 'Actor', id: number, name: string } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type SignupMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'ActorResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, actor?: { __typename?: 'Actor', id: number, name: string } | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'Actor', id: number, name: string } | null };

export type SessionsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type SessionsQuery = { __typename?: 'Query', sessions: { __typename?: 'PaginatedSessions', hasMore: boolean, sessions: Array<{ __typename?: 'Session', id: number, title: string, textSnippet: string, hasMoreText: boolean, start: string, end: string, numberOfAttendees: number, attendeeLimit: number, actorIsPartOfSession: boolean, creatorId: number, createdAt: string, updatedAt: string }> } };

export const BasicErrorFragmentDoc = gql`
    fragment BasicError on FieldError {
  field
  message
}
    `;
export const BasicActorFragmentDoc = gql`
    fragment BasicActor on Actor {
  id
  name
}
    `;
export const BasicActorResponseFragmentDoc = gql`
    fragment BasicActorResponse on ActorResponse {
  errors {
    ...BasicError
  }
  actor {
    ...BasicActor
  }
}
    ${BasicErrorFragmentDoc}
${BasicActorFragmentDoc}`;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    ...BasicActorResponse
  }
}
    ${BasicActorResponseFragmentDoc}`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const CreateSessionDocument = gql`
    mutation CreateSession($input: SessionInput!) {
  createSession(input: $input) {
    id
    title
    text
    start
    end
    attendeeLimit
    creatorId
    createdAt
    updatedAt
  }
}
    `;

export function useCreateSessionMutation() {
  return Urql.useMutation<CreateSessionMutation, CreateSessionMutationVariables>(CreateSessionDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const LoginDocument = gql`
    mutation Login($nameOrEmail: String!, $password: String!) {
  login(nameOrEmail: $nameOrEmail, password: $password) {
    ...BasicActorResponse
  }
}
    ${BasicActorResponseFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const SignupDocument = gql`
    mutation Signup($name: String!, $email: String!, $password: String!) {
  signup(name: $name, email: $email, password: $password) {
    ...BasicActorResponse
  }
}
    ${BasicActorResponseFragmentDoc}`;

export function useSignupMutation() {
  return Urql.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    ...BasicActor
  }
}
    ${BasicActorFragmentDoc}`;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options });
};
export const SessionsDocument = gql`
    query Sessions($limit: Int!, $cursor: String) {
  sessions(limit: $limit, cursor: $cursor) {
    hasMore
    sessions {
      id
      title
      textSnippet
      hasMoreText
      start
      end
      numberOfAttendees
      attendeeLimit
      actorIsPartOfSession
      creatorId
      createdAt
      updatedAt
    }
  }
}
    `;

export function useSessionsQuery(options: Omit<Urql.UseQueryArgs<SessionsQueryVariables>, 'query'>) {
  return Urql.useQuery<SessionsQuery, SessionsQueryVariables>({ query: SessionsDocument, ...options });
};