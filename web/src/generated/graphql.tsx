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

export type ActorFieldError = {
  __typename?: 'ActorFieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type ActorResponse = {
  __typename?: 'ActorResponse';
  actor?: Maybe<Actor>;
  errors?: Maybe<Array<ActorFieldError>>;
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

export type PaginatedOngoingSessions = {
  __typename?: 'PaginatedOngoingSessions';
  hasMore: Scalars['Boolean'];
  sessions: Array<Session>;
};

export type PaginatedPastSessions = {
  __typename?: 'PaginatedPastSessions';
  hasMore: Scalars['Boolean'];
  sessions: Array<Session>;
};

export type PaginatedUpcomingSessions = {
  __typename?: 'PaginatedUpcomingSessions';
  hasMore: Scalars['Boolean'];
  sessions: Array<Session>;
};

export type Query = {
  __typename?: 'Query';
  actor?: Maybe<Actor>;
  me?: Maybe<Actor>;
  ongoingSessions: PaginatedOngoingSessions;
  pastSessions: PaginatedPastSessions;
  session?: Maybe<Session>;
  upcomingSessions: PaginatedUpcomingSessions;
};


export type QueryActorArgs = {
  id: Scalars['Int'];
};


export type QueryOngoingSessionsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryPastSessionsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QuerySessionArgs = {
  id: Scalars['Int'];
};


export type QueryUpcomingSessionsArgs = {
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
  hasMoreText: Scalars['Boolean'];
  id: Scalars['Int'];
  numberOfAttendees: Scalars['Int'];
  start: Scalars['String'];
  stop: Scalars['String'];
  text: Scalars['String'];
  textSnippet: Scalars['String'];
  timeStatus: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type SessionInput = {
  attendeeLimit: Scalars['Float'];
  start: Scalars['DateTime'];
  stop: Scalars['DateTime'];
  text: Scalars['String'];
  title: Scalars['String'];
};

export type BasicActorFragment = { __typename?: 'Actor', id: number, name: string };

export type BasicActorErrorFragment = { __typename?: 'ActorFieldError', field: string, message: string };

export type BasicActorResponseFragment = { __typename?: 'ActorResponse', errors?: Array<{ __typename?: 'ActorFieldError', field: string, message: string }> | null, actor?: { __typename?: 'Actor', id: number, name: string } | null };

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'ActorResponse', errors?: Array<{ __typename?: 'ActorFieldError', field: string, message: string }> | null, actor?: { __typename?: 'Actor', id: number, name: string } | null } };

export type CreateSessionMutationVariables = Exact<{
  input: SessionInput;
}>;


export type CreateSessionMutation = { __typename?: 'Mutation', createSession: { __typename?: 'Session', id: number } };

export type DeleteSessionMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteSessionMutation = { __typename?: 'Mutation', deleteSession: boolean };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type JoinSessionMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type JoinSessionMutation = { __typename?: 'Mutation', joinSession: boolean };

export type LeaveSessionMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type LeaveSessionMutation = { __typename?: 'Mutation', leaveSession: boolean };

export type LoginMutationVariables = Exact<{
  nameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'ActorResponse', errors?: Array<{ __typename?: 'ActorFieldError', field: string, message: string }> | null, actor?: { __typename?: 'Actor', id: number, name: string } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type SignupMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'ActorResponse', errors?: Array<{ __typename?: 'ActorFieldError', field: string, message: string }> | null, actor?: { __typename?: 'Actor', id: number, name: string } | null } };

export type UpdateSessionMutationVariables = Exact<{
  id: Scalars['Int'];
  input: SessionInput;
}>;


export type UpdateSessionMutation = { __typename?: 'Mutation', updateSession: { __typename?: 'Session', id: number } };

export type ActorQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ActorQuery = { __typename?: 'Query', actor?: { __typename?: 'Actor', id: number, name: string, email: string, updatedAt: string, createdAt: string } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'Actor', id: number, name: string } | null };

export type OngoingSessionsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type OngoingSessionsQuery = { __typename?: 'Query', ongoingSessions: { __typename?: 'PaginatedOngoingSessions', hasMore: boolean, sessions: Array<{ __typename?: 'Session', id: number, title: string, textSnippet: string, hasMoreText: boolean, text: string, start: string, stop: string, numberOfAttendees: number, attendeeLimit: number, actorIsPartOfSession: boolean, creatorId: number, timeStatus: string, createdAt: string, updatedAt: string, creator: { __typename?: 'Actor', id: number, name: string, email: string, createdAt: string, updatedAt: string } }> } };

export type PastSessionsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type PastSessionsQuery = { __typename?: 'Query', pastSessions: { __typename?: 'PaginatedPastSessions', hasMore: boolean, sessions: Array<{ __typename?: 'Session', id: number, title: string, textSnippet: string, hasMoreText: boolean, text: string, start: string, stop: string, numberOfAttendees: number, attendeeLimit: number, actorIsPartOfSession: boolean, creatorId: number, timeStatus: string, createdAt: string, updatedAt: string, creator: { __typename?: 'Actor', id: number, name: string, email: string, createdAt: string, updatedAt: string } }> } };

export type SessionQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type SessionQuery = { __typename?: 'Query', session?: { __typename?: 'Session', id: number, title: string, text: string, start: string, stop: string, numberOfAttendees: number, attendeeLimit: number, actorIsPartOfSession: boolean, creatorId: number, timeStatus: string, createdAt: string, updatedAt: string, creator: { __typename?: 'Actor', id: number, name: string, email: string, updatedAt: string, createdAt: string } } | null };

export type UpcomingSessionsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type UpcomingSessionsQuery = { __typename?: 'Query', upcomingSessions: { __typename?: 'PaginatedUpcomingSessions', hasMore: boolean, sessions: Array<{ __typename?: 'Session', id: number, title: string, textSnippet: string, hasMoreText: boolean, text: string, start: string, stop: string, numberOfAttendees: number, attendeeLimit: number, actorIsPartOfSession: boolean, creatorId: number, timeStatus: string, createdAt: string, updatedAt: string, creator: { __typename?: 'Actor', id: number, name: string, email: string, createdAt: string, updatedAt: string } }> } };

export const BasicActorErrorFragmentDoc = gql`
    fragment BasicActorError on ActorFieldError {
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
    ...BasicActorError
  }
  actor {
    ...BasicActor
  }
}
    ${BasicActorErrorFragmentDoc}
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
  }
}
    `;

export function useCreateSessionMutation() {
  return Urql.useMutation<CreateSessionMutation, CreateSessionMutationVariables>(CreateSessionDocument);
};
export const DeleteSessionDocument = gql`
    mutation DeleteSession($id: Int!) {
  deleteSession(id: $id)
}
    `;

export function useDeleteSessionMutation() {
  return Urql.useMutation<DeleteSessionMutation, DeleteSessionMutationVariables>(DeleteSessionDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const JoinSessionDocument = gql`
    mutation JoinSession($id: Int!) {
  joinSession(id: $id)
}
    `;

export function useJoinSessionMutation() {
  return Urql.useMutation<JoinSessionMutation, JoinSessionMutationVariables>(JoinSessionDocument);
};
export const LeaveSessionDocument = gql`
    mutation LeaveSession($id: Int!) {
  leaveSession(id: $id)
}
    `;

export function useLeaveSessionMutation() {
  return Urql.useMutation<LeaveSessionMutation, LeaveSessionMutationVariables>(LeaveSessionDocument);
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
export const UpdateSessionDocument = gql`
    mutation UpdateSession($id: Int!, $input: SessionInput!) {
  updateSession(id: $id, input: $input) {
    id
  }
}
    `;

export function useUpdateSessionMutation() {
  return Urql.useMutation<UpdateSessionMutation, UpdateSessionMutationVariables>(UpdateSessionDocument);
};
export const ActorDocument = gql`
    query Actor($id: Int!) {
  actor(id: $id) {
    id
    name
    email
    updatedAt
    createdAt
  }
}
    `;

export function useActorQuery(options: Omit<Urql.UseQueryArgs<ActorQueryVariables>, 'query'>) {
  return Urql.useQuery<ActorQuery, ActorQueryVariables>({ query: ActorDocument, ...options });
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
export const OngoingSessionsDocument = gql`
    query OngoingSessions($limit: Int!, $cursor: String) {
  ongoingSessions(limit: $limit, cursor: $cursor) {
    hasMore
    sessions {
      id
      title
      textSnippet
      hasMoreText
      text
      start
      stop
      numberOfAttendees
      attendeeLimit
      actorIsPartOfSession
      creatorId
      timeStatus
      createdAt
      updatedAt
      creator {
        id
        name
        email
        createdAt
        updatedAt
      }
    }
  }
}
    `;

export function useOngoingSessionsQuery(options: Omit<Urql.UseQueryArgs<OngoingSessionsQueryVariables>, 'query'>) {
  return Urql.useQuery<OngoingSessionsQuery, OngoingSessionsQueryVariables>({ query: OngoingSessionsDocument, ...options });
};
export const PastSessionsDocument = gql`
    query PastSessions($limit: Int!, $cursor: String) {
  pastSessions(limit: $limit, cursor: $cursor) {
    hasMore
    sessions {
      id
      title
      textSnippet
      hasMoreText
      text
      start
      stop
      numberOfAttendees
      attendeeLimit
      actorIsPartOfSession
      creatorId
      timeStatus
      createdAt
      updatedAt
      creator {
        id
        name
        email
        createdAt
        updatedAt
      }
    }
  }
}
    `;

export function usePastSessionsQuery(options: Omit<Urql.UseQueryArgs<PastSessionsQueryVariables>, 'query'>) {
  return Urql.useQuery<PastSessionsQuery, PastSessionsQueryVariables>({ query: PastSessionsDocument, ...options });
};
export const SessionDocument = gql`
    query Session($id: Int!) {
  session(id: $id) {
    id
    title
    text
    start
    stop
    numberOfAttendees
    attendeeLimit
    actorIsPartOfSession
    creatorId
    timeStatus
    createdAt
    updatedAt
    creator {
      id
      name
      email
      updatedAt
      createdAt
    }
  }
}
    `;

export function useSessionQuery(options: Omit<Urql.UseQueryArgs<SessionQueryVariables>, 'query'>) {
  return Urql.useQuery<SessionQuery, SessionQueryVariables>({ query: SessionDocument, ...options });
};
export const UpcomingSessionsDocument = gql`
    query UpcomingSessions($limit: Int!, $cursor: String) {
  upcomingSessions(limit: $limit, cursor: $cursor) {
    hasMore
    sessions {
      id
      title
      textSnippet
      hasMoreText
      text
      start
      stop
      numberOfAttendees
      attendeeLimit
      actorIsPartOfSession
      creatorId
      timeStatus
      createdAt
      updatedAt
      creator {
        id
        name
        email
        createdAt
        updatedAt
      }
    }
  }
}
    `;

export function useUpcomingSessionsQuery(options: Omit<Urql.UseQueryArgs<UpcomingSessionsQueryVariables>, 'query'>) {
  return Urql.useQuery<UpcomingSessionsQuery, UpcomingSessionsQueryVariables>({ query: UpcomingSessionsDocument, ...options });
};