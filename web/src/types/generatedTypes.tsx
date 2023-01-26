import gql from "graphql-tag";
import * as Urql from "urql";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
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
  __typename?: "Actor";
  createdAt: Scalars["String"];
  email?: Maybe<Scalars["String"]>;
  hasDiscordIntegration?: Maybe<Scalars["Boolean"]>;
  id: Scalars["Int"];
  name: Scalars["String"];
  updatedAt: Scalars["String"];
};

export type ActorFieldError = {
  __typename?: "ActorFieldError";
  field: Scalars["String"];
  message: Scalars["String"];
};

export type ActorInput = {
  email?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export type ActorResponse = {
  __typename?: "ActorResponse";
  actor?: Maybe<Actor>;
  errors?: Maybe<Array<ActorFieldError>>;
};

export type Mutation = {
  __typename?: "Mutation";
  cancelSession: Scalars["Boolean"];
  changePassword: ActorResponse;
  changePasswordLoggedIn: ActorResponse;
  createSession: Scalars["Boolean"];
  createSessionComment: SessionComment;
  deleteDiscordIntegration: Scalars["Boolean"];
  deleteSession: Scalars["Boolean"];
  deleteSessionComment: Scalars["Boolean"];
  forgetMe: Scalars["Boolean"];
  forgotPassword: Scalars["Boolean"];
  joinSession: Scalars["Boolean"];
  joinSessionVoiceChannel: Scalars["Boolean"];
  leaveSession: Scalars["Boolean"];
  login: ActorResponse;
  logout: Scalars["Boolean"];
  signup: ActorResponse;
  updateActor: ActorResponse;
  updateSession: Scalars["Boolean"];
  updateSessionComment: Scalars["Boolean"];
};

export type MutationCancelSessionArgs = {
  id: Scalars["Int"];
};

export type MutationChangePasswordArgs = {
  newPassword: Scalars["String"];
  token: Scalars["String"];
};

export type MutationChangePasswordLoggedInArgs = {
  newPassword: Scalars["String"];
  oldPassword: Scalars["String"];
};

export type MutationCreateSessionArgs = {
  input: SessionInput;
};

export type MutationCreateSessionCommentArgs = {
  sessionId: Scalars["Int"];
  text: Scalars["String"];
};

export type MutationDeleteSessionArgs = {
  id: Scalars["Int"];
};

export type MutationDeleteSessionCommentArgs = {
  id: Scalars["Int"];
};

export type MutationForgotPasswordArgs = {
  email: Scalars["String"];
};

export type MutationJoinSessionArgs = {
  id: Scalars["Int"];
};

export type MutationJoinSessionVoiceChannelArgs = {
  id: Scalars["Int"];
};

export type MutationLeaveSessionArgs = {
  id: Scalars["Int"];
};

export type MutationLoginArgs = {
  nameOrEmail: Scalars["String"];
  password: Scalars["String"];
};

export type MutationSignupArgs = {
  email: Scalars["String"];
  name: Scalars["String"];
  password: Scalars["String"];
};

export type MutationUpdateActorArgs = {
  input: ActorInput;
};

export type MutationUpdateSessionArgs = {
  id: Scalars["Int"];
  input: SessionInput;
};

export type MutationUpdateSessionCommentArgs = {
  id: Scalars["Int"];
  text: Scalars["String"];
};

export type PaginatedOngoingSessions = {
  __typename?: "PaginatedOngoingSessions";
  hasMore: Scalars["Boolean"];
  sessions: Array<Session>;
};

export type PaginatedPastSessions = {
  __typename?: "PaginatedPastSessions";
  hasMore: Scalars["Boolean"];
  sessions: Array<Session>;
};

export type PaginatedUpcomingSessions = {
  __typename?: "PaginatedUpcomingSessions";
  hasMore: Scalars["Boolean"];
  sessions: Array<Session>;
};

export type Query = {
  __typename?: "Query";
  actor?: Maybe<Actor>;
  me?: Maybe<Actor>;
  ongoingSessions: PaginatedOngoingSessions;
  pastSessions: PaginatedPastSessions;
  session?: Maybe<Session>;
  sessionComments?: Maybe<Array<SessionComment>>;
  upcomingSessions: PaginatedUpcomingSessions;
};

export type QueryActorArgs = {
  id: Scalars["Int"];
};

export type QueryOngoingSessionsArgs = {
  cursor?: InputMaybe<Scalars["String"]>;
  limit: Scalars["Int"];
};

export type QueryPastSessionsArgs = {
  cursor?: InputMaybe<Scalars["String"]>;
  limit: Scalars["Int"];
};

export type QuerySessionArgs = {
  id: Scalars["Int"];
};

export type QuerySessionCommentsArgs = {
  sessionId: Scalars["Int"];
};

export type QueryUpcomingSessionsArgs = {
  cursor?: InputMaybe<Scalars["String"]>;
  limit: Scalars["Int"];
};

export type Session = {
  __typename?: "Session";
  actorIsPartOfSession: Scalars["Boolean"];
  attendeeLimit: Scalars["Int"];
  createdAt: Scalars["String"];
  creator: Actor;
  hasMoreText: Scalars["Boolean"];
  id: Scalars["Int"];
  isCancelled: Scalars["Boolean"];
  isRemote: Scalars["Boolean"];
  location?: Maybe<Scalars["String"]>;
  numberOfAttendees: Scalars["Int"];
  start: Scalars["String"];
  stop: Scalars["String"];
  text?: Maybe<Scalars["String"]>;
  textSnippet: Scalars["String"];
  timeStatus: Scalars["String"];
  title: Scalars["String"];
  updatedAt: Scalars["String"];
  voiceChannelUrl?: Maybe<Scalars["String"]>;
};

export type SessionComment = {
  __typename?: "SessionComment";
  createdAt: Scalars["String"];
  creator: Actor;
  id: Scalars["Int"];
  sessionId: Scalars["Int"];
  text: Scalars["String"];
  updatedAt: Scalars["String"];
};

export type SessionInput = {
  attendeeLimit: Scalars["Float"];
  isRemote: Scalars["Boolean"];
  location?: InputMaybe<Scalars["String"]>;
  start: Scalars["DateTime"];
  stop: Scalars["DateTime"];
  text?: InputMaybe<Scalars["String"]>;
  title: Scalars["String"];
};

export type BasicActorFragment = {
  __typename?: "Actor";
  id: number;
  name: string;
};

export type BasicActorErrorFragment = {
  __typename?: "ActorFieldError";
  field: string;
  message: string;
};

export type BasicActorResponseFragment = {
  __typename?: "ActorResponse";
  errors?: Array<{
    __typename?: "ActorFieldError";
    field: string;
    message: string;
  }> | null;
  actor?: { __typename?: "Actor"; id: number; name: string } | null;
};

export type FullActorFragment = {
  __typename?: "Actor";
  id: number;
  name: string;
  email?: string | null;
  hasDiscordIntegration?: boolean | null;
  createdAt: string;
  updatedAt: string;
};

export type FullActorResponseFragment = {
  __typename?: "ActorResponse";
  errors?: Array<{
    __typename?: "ActorFieldError";
    field: string;
    message: string;
  }> | null;
  actor?: {
    __typename?: "Actor";
    id: number;
    name: string;
    email?: string | null;
    hasDiscordIntegration?: boolean | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type FullSessionFragment = {
  __typename?: "Session";
  id: number;
  title: string;
  textSnippet: string;
  hasMoreText: boolean;
  text?: string | null;
  start: string;
  stop: string;
  numberOfAttendees: number;
  attendeeLimit: number;
  isRemote: boolean;
  isCancelled: boolean;
  voiceChannelUrl?: string | null;
  location?: string | null;
  actorIsPartOfSession: boolean;
  timeStatus: string;
  createdAt: string;
  updatedAt: string;
  creator: {
    __typename?: "Actor";
    id: number;
    name: string;
    email?: string | null;
    hasDiscordIntegration?: boolean | null;
    createdAt: string;
    updatedAt: string;
  };
};

export type CancelSessionMutationVariables = Exact<{
  id: Scalars["Int"];
}>;

export type CancelSessionMutation = {
  __typename?: "Mutation";
  cancelSession: boolean;
};

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars["String"];
  newPassword: Scalars["String"];
}>;

export type ChangePasswordMutation = {
  __typename?: "Mutation";
  changePassword: {
    __typename?: "ActorResponse";
    errors?: Array<{
      __typename?: "ActorFieldError";
      field: string;
      message: string;
    }> | null;
    actor?: { __typename?: "Actor"; id: number; name: string } | null;
  };
};

export type ChangePasswordLoggedInMutationVariables = Exact<{
  oldPassword: Scalars["String"];
  newPassword: Scalars["String"];
}>;

export type ChangePasswordLoggedInMutation = {
  __typename?: "Mutation";
  changePasswordLoggedIn: {
    __typename?: "ActorResponse";
    errors?: Array<{
      __typename?: "ActorFieldError";
      field: string;
      message: string;
    }> | null;
    actor?: { __typename?: "Actor"; id: number; name: string } | null;
  };
};

export type CreateSessionMutationVariables = Exact<{
  input: SessionInput;
}>;

export type CreateSessionMutation = {
  __typename?: "Mutation";
  createSession: boolean;
};

export type CreateSessionCommentMutationVariables = Exact<{
  sessionId: Scalars["Int"];
  text: Scalars["String"];
}>;

export type CreateSessionCommentMutation = {
  __typename?: "Mutation";
  createSessionComment: { __typename?: "SessionComment"; id: number };
};

export type DeleteDiscordIntegrationMutationVariables = Exact<{
  [key: string]: never;
}>;

export type DeleteDiscordIntegrationMutation = {
  __typename?: "Mutation";
  deleteDiscordIntegration: boolean;
};

export type DeleteSessionMutationVariables = Exact<{
  id: Scalars["Int"];
}>;

export type DeleteSessionMutation = {
  __typename?: "Mutation";
  deleteSession: boolean;
};

export type DeleteSessionCommentMutationVariables = Exact<{
  id: Scalars["Int"];
}>;

export type DeleteSessionCommentMutation = {
  __typename?: "Mutation";
  deleteSessionComment: boolean;
};

export type ForgetMeMutationVariables = Exact<{ [key: string]: never }>;

export type ForgetMeMutation = { __typename?: "Mutation"; forgetMe: boolean };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars["String"];
}>;

export type ForgotPasswordMutation = {
  __typename?: "Mutation";
  forgotPassword: boolean;
};

export type JoinSessionMutationVariables = Exact<{
  id: Scalars["Int"];
}>;

export type JoinSessionMutation = {
  __typename?: "Mutation";
  joinSession: boolean;
};

export type JoinSessionVoiceChannelMutationVariables = Exact<{
  id: Scalars["Int"];
}>;

export type JoinSessionVoiceChannelMutation = {
  __typename?: "Mutation";
  joinSessionVoiceChannel: boolean;
};

export type LeaveSessionMutationVariables = Exact<{
  id: Scalars["Int"];
}>;

export type LeaveSessionMutation = {
  __typename?: "Mutation";
  leaveSession: boolean;
};

export type LoginMutationVariables = Exact<{
  nameOrEmail: Scalars["String"];
  password: Scalars["String"];
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login: {
    __typename?: "ActorResponse";
    errors?: Array<{
      __typename?: "ActorFieldError";
      field: string;
      message: string;
    }> | null;
    actor?: {
      __typename?: "Actor";
      id: number;
      name: string;
      email?: string | null;
      hasDiscordIntegration?: boolean | null;
      createdAt: string;
      updatedAt: string;
    } | null;
  };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: "Mutation"; logout: boolean };

export type SignupMutationVariables = Exact<{
  name: Scalars["String"];
  email: Scalars["String"];
  password: Scalars["String"];
}>;

export type SignupMutation = {
  __typename?: "Mutation";
  signup: {
    __typename?: "ActorResponse";
    errors?: Array<{
      __typename?: "ActorFieldError";
      field: string;
      message: string;
    }> | null;
    actor?: {
      __typename?: "Actor";
      id: number;
      name: string;
      email?: string | null;
      hasDiscordIntegration?: boolean | null;
      createdAt: string;
      updatedAt: string;
    } | null;
  };
};

export type UpdateActorMutationVariables = Exact<{
  input: ActorInput;
}>;

export type UpdateActorMutation = {
  __typename?: "Mutation";
  updateActor: {
    __typename?: "ActorResponse";
    errors?: Array<{
      __typename?: "ActorFieldError";
      field: string;
      message: string;
    }> | null;
    actor?: { __typename?: "Actor"; id: number; name: string } | null;
  };
};

export type UpdateSessionMutationVariables = Exact<{
  id: Scalars["Int"];
  input: SessionInput;
}>;

export type UpdateSessionMutation = {
  __typename?: "Mutation";
  updateSession: boolean;
};

export type UpdateSessionCommentMutationVariables = Exact<{
  id: Scalars["Int"];
  text: Scalars["String"];
}>;

export type UpdateSessionCommentMutation = {
  __typename?: "Mutation";
  updateSessionComment: boolean;
};

export type ActorQueryVariables = Exact<{
  id: Scalars["Int"];
}>;

export type ActorQuery = {
  __typename?: "Query";
  actor?: {
    __typename?: "Actor";
    id: number;
    name: string;
    email?: string | null;
    hasDiscordIntegration?: boolean | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: "Query";
  me?: {
    __typename?: "Actor";
    id: number;
    name: string;
    email?: string | null;
    hasDiscordIntegration?: boolean | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OngoingSessionsQueryVariables = Exact<{
  limit: Scalars["Int"];
  cursor?: InputMaybe<Scalars["String"]>;
}>;

export type OngoingSessionsQuery = {
  __typename?: "Query";
  ongoingSessions: {
    __typename?: "PaginatedOngoingSessions";
    hasMore: boolean;
    sessions: Array<{
      __typename?: "Session";
      id: number;
      title: string;
      textSnippet: string;
      hasMoreText: boolean;
      text?: string | null;
      start: string;
      stop: string;
      numberOfAttendees: number;
      attendeeLimit: number;
      isRemote: boolean;
      isCancelled: boolean;
      voiceChannelUrl?: string | null;
      location?: string | null;
      actorIsPartOfSession: boolean;
      timeStatus: string;
      createdAt: string;
      updatedAt: string;
      creator: {
        __typename?: "Actor";
        id: number;
        name: string;
        email?: string | null;
        hasDiscordIntegration?: boolean | null;
        createdAt: string;
        updatedAt: string;
      };
    }>;
  };
};

export type PastSessionsQueryVariables = Exact<{
  limit: Scalars["Int"];
  cursor?: InputMaybe<Scalars["String"]>;
}>;

export type PastSessionsQuery = {
  __typename?: "Query";
  pastSessions: {
    __typename?: "PaginatedPastSessions";
    hasMore: boolean;
    sessions: Array<{
      __typename?: "Session";
      id: number;
      title: string;
      textSnippet: string;
      hasMoreText: boolean;
      text?: string | null;
      start: string;
      stop: string;
      numberOfAttendees: number;
      attendeeLimit: number;
      isRemote: boolean;
      isCancelled: boolean;
      voiceChannelUrl?: string | null;
      location?: string | null;
      actorIsPartOfSession: boolean;
      timeStatus: string;
      createdAt: string;
      updatedAt: string;
      creator: {
        __typename?: "Actor";
        id: number;
        name: string;
        email?: string | null;
        hasDiscordIntegration?: boolean | null;
        createdAt: string;
        updatedAt: string;
      };
    }>;
  };
};

export type SessionQueryVariables = Exact<{
  id: Scalars["Int"];
}>;

export type SessionQuery = {
  __typename?: "Query";
  session?: {
    __typename?: "Session";
    id: number;
    title: string;
    textSnippet: string;
    hasMoreText: boolean;
    text?: string | null;
    start: string;
    stop: string;
    numberOfAttendees: number;
    attendeeLimit: number;
    isRemote: boolean;
    isCancelled: boolean;
    voiceChannelUrl?: string | null;
    location?: string | null;
    actorIsPartOfSession: boolean;
    timeStatus: string;
    createdAt: string;
    updatedAt: string;
    creator: {
      __typename?: "Actor";
      id: number;
      name: string;
      email?: string | null;
      hasDiscordIntegration?: boolean | null;
      createdAt: string;
      updatedAt: string;
    };
  } | null;
};

export type SessionCommentsQueryVariables = Exact<{
  sessionId: Scalars["Int"];
}>;

export type SessionCommentsQuery = {
  __typename?: "Query";
  sessionComments?: Array<{
    __typename?: "SessionComment";
    id: number;
    text: string;
    sessionId: number;
    createdAt: string;
    updatedAt: string;
    creator: {
      __typename?: "Actor";
      id: number;
      name: string;
      email?: string | null;
      hasDiscordIntegration?: boolean | null;
      createdAt: string;
      updatedAt: string;
    };
  }> | null;
};

export type UpcomingSessionsQueryVariables = Exact<{
  limit: Scalars["Int"];
  cursor?: InputMaybe<Scalars["String"]>;
}>;

export type UpcomingSessionsQuery = {
  __typename?: "Query";
  upcomingSessions: {
    __typename?: "PaginatedUpcomingSessions";
    hasMore: boolean;
    sessions: Array<{
      __typename?: "Session";
      id: number;
      title: string;
      textSnippet: string;
      hasMoreText: boolean;
      text?: string | null;
      start: string;
      stop: string;
      numberOfAttendees: number;
      attendeeLimit: number;
      isRemote: boolean;
      isCancelled: boolean;
      voiceChannelUrl?: string | null;
      location?: string | null;
      actorIsPartOfSession: boolean;
      timeStatus: string;
      createdAt: string;
      updatedAt: string;
      creator: {
        __typename?: "Actor";
        id: number;
        name: string;
        email?: string | null;
        hasDiscordIntegration?: boolean | null;
        createdAt: string;
        updatedAt: string;
      };
    }>;
  };
};

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
  ${BasicActorFragmentDoc}
`;
export const FullActorFragmentDoc = gql`
  fragment FullActor on Actor {
    id
    name
    email
    hasDiscordIntegration
    createdAt
    updatedAt
  }
`;
export const FullActorResponseFragmentDoc = gql`
  fragment FullActorResponse on ActorResponse {
    errors {
      ...BasicActorError
    }
    actor {
      ...FullActor
    }
  }
  ${BasicActorErrorFragmentDoc}
  ${FullActorFragmentDoc}
`;
export const FullSessionFragmentDoc = gql`
  fragment FullSession on Session {
    id
    title
    textSnippet
    hasMoreText
    text
    start
    stop
    numberOfAttendees
    attendeeLimit
    isRemote
    isCancelled
    voiceChannelUrl
    location
    actorIsPartOfSession
    timeStatus
    creator {
      ...FullActor
    }
    createdAt
    updatedAt
  }
  ${FullActorFragmentDoc}
`;
export const CancelSessionDocument = gql`
  mutation CancelSession($id: Int!) {
    cancelSession(id: $id)
  }
`;

export function useCancelSessionMutation() {
  return Urql.useMutation<
    CancelSessionMutation,
    CancelSessionMutationVariables
  >(CancelSessionDocument);
}
export const ChangePasswordDocument = gql`
  mutation ChangePassword($token: String!, $newPassword: String!) {
    changePassword(token: $token, newPassword: $newPassword) {
      ...BasicActorResponse
    }
  }
  ${BasicActorResponseFragmentDoc}
`;

export function useChangePasswordMutation() {
  return Urql.useMutation<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >(ChangePasswordDocument);
}
export const ChangePasswordLoggedInDocument = gql`
  mutation ChangePasswordLoggedIn(
    $oldPassword: String!
    $newPassword: String!
  ) {
    changePasswordLoggedIn(
      oldPassword: $oldPassword
      newPassword: $newPassword
    ) {
      ...BasicActorResponse
    }
  }
  ${BasicActorResponseFragmentDoc}
`;

export function useChangePasswordLoggedInMutation() {
  return Urql.useMutation<
    ChangePasswordLoggedInMutation,
    ChangePasswordLoggedInMutationVariables
  >(ChangePasswordLoggedInDocument);
}
export const CreateSessionDocument = gql`
  mutation CreateSession($input: SessionInput!) {
    createSession(input: $input)
  }
`;

export function useCreateSessionMutation() {
  return Urql.useMutation<
    CreateSessionMutation,
    CreateSessionMutationVariables
  >(CreateSessionDocument);
}
export const CreateSessionCommentDocument = gql`
  mutation CreateSessionComment($sessionId: Int!, $text: String!) {
    createSessionComment(sessionId: $sessionId, text: $text) {
      id
    }
  }
`;

export function useCreateSessionCommentMutation() {
  return Urql.useMutation<
    CreateSessionCommentMutation,
    CreateSessionCommentMutationVariables
  >(CreateSessionCommentDocument);
}
export const DeleteDiscordIntegrationDocument = gql`
  mutation DeleteDiscordIntegration {
    deleteDiscordIntegration
  }
`;

export function useDeleteDiscordIntegrationMutation() {
  return Urql.useMutation<
    DeleteDiscordIntegrationMutation,
    DeleteDiscordIntegrationMutationVariables
  >(DeleteDiscordIntegrationDocument);
}
export const DeleteSessionDocument = gql`
  mutation DeleteSession($id: Int!) {
    deleteSession(id: $id)
  }
`;

export function useDeleteSessionMutation() {
  return Urql.useMutation<
    DeleteSessionMutation,
    DeleteSessionMutationVariables
  >(DeleteSessionDocument);
}
export const DeleteSessionCommentDocument = gql`
  mutation DeleteSessionComment($id: Int!) {
    deleteSessionComment(id: $id)
  }
`;

export function useDeleteSessionCommentMutation() {
  return Urql.useMutation<
    DeleteSessionCommentMutation,
    DeleteSessionCommentMutationVariables
  >(DeleteSessionCommentDocument);
}
export const ForgetMeDocument = gql`
  mutation ForgetMe {
    forgetMe
  }
`;

export function useForgetMeMutation() {
  return Urql.useMutation<ForgetMeMutation, ForgetMeMutationVariables>(
    ForgetMeDocument
  );
}
export const ForgotPasswordDocument = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;

export function useForgotPasswordMutation() {
  return Urql.useMutation<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >(ForgotPasswordDocument);
}
export const JoinSessionDocument = gql`
  mutation JoinSession($id: Int!) {
    joinSession(id: $id)
  }
`;

export function useJoinSessionMutation() {
  return Urql.useMutation<JoinSessionMutation, JoinSessionMutationVariables>(
    JoinSessionDocument
  );
}
export const JoinSessionVoiceChannelDocument = gql`
  mutation JoinSessionVoiceChannel($id: Int!) {
    joinSessionVoiceChannel(id: $id)
  }
`;

export function useJoinSessionVoiceChannelMutation() {
  return Urql.useMutation<
    JoinSessionVoiceChannelMutation,
    JoinSessionVoiceChannelMutationVariables
  >(JoinSessionVoiceChannelDocument);
}
export const LeaveSessionDocument = gql`
  mutation LeaveSession($id: Int!) {
    leaveSession(id: $id)
  }
`;

export function useLeaveSessionMutation() {
  return Urql.useMutation<LeaveSessionMutation, LeaveSessionMutationVariables>(
    LeaveSessionDocument
  );
}
export const LoginDocument = gql`
  mutation Login($nameOrEmail: String!, $password: String!) {
    login(nameOrEmail: $nameOrEmail, password: $password) {
      ...FullActorResponse
    }
  }
  ${FullActorResponseFragmentDoc}
`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
}
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument
  );
}
export const SignupDocument = gql`
  mutation Signup($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      ...FullActorResponse
    }
  }
  ${FullActorResponseFragmentDoc}
`;

export function useSignupMutation() {
  return Urql.useMutation<SignupMutation, SignupMutationVariables>(
    SignupDocument
  );
}
export const UpdateActorDocument = gql`
  mutation updateActor($input: ActorInput!) {
    updateActor(input: $input) {
      ...BasicActorResponse
    }
  }
  ${BasicActorResponseFragmentDoc}
`;

export function useUpdateActorMutation() {
  return Urql.useMutation<UpdateActorMutation, UpdateActorMutationVariables>(
    UpdateActorDocument
  );
}
export const UpdateSessionDocument = gql`
  mutation UpdateSession($id: Int!, $input: SessionInput!) {
    updateSession(id: $id, input: $input)
  }
`;

export function useUpdateSessionMutation() {
  return Urql.useMutation<
    UpdateSessionMutation,
    UpdateSessionMutationVariables
  >(UpdateSessionDocument);
}
export const UpdateSessionCommentDocument = gql`
  mutation UpdateSessionComment($id: Int!, $text: String!) {
    updateSessionComment(id: $id, text: $text)
  }
`;

export function useUpdateSessionCommentMutation() {
  return Urql.useMutation<
    UpdateSessionCommentMutation,
    UpdateSessionCommentMutationVariables
  >(UpdateSessionCommentDocument);
}
export const ActorDocument = gql`
  query Actor($id: Int!) {
    actor(id: $id) {
      ...FullActor
    }
  }
  ${FullActorFragmentDoc}
`;

export function useActorQuery(
  options: Omit<Urql.UseQueryArgs<ActorQueryVariables>, "query">
) {
  return Urql.useQuery<ActorQuery, ActorQueryVariables>({
    query: ActorDocument,
    ...options,
  });
}
export const MeDocument = gql`
  query Me {
    me {
      ...FullActor
    }
  }
  ${FullActorFragmentDoc}
`;

export function useMeQuery(
  options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, "query">
) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({
    query: MeDocument,
    ...options,
  });
}
export const OngoingSessionsDocument = gql`
  query OngoingSessions($limit: Int!, $cursor: String) {
    ongoingSessions(limit: $limit, cursor: $cursor) {
      hasMore
      sessions {
        ...FullSession
      }
    }
  }
  ${FullSessionFragmentDoc}
`;

export function useOngoingSessionsQuery(
  options: Omit<Urql.UseQueryArgs<OngoingSessionsQueryVariables>, "query">
) {
  return Urql.useQuery<OngoingSessionsQuery, OngoingSessionsQueryVariables>({
    query: OngoingSessionsDocument,
    ...options,
  });
}
export const PastSessionsDocument = gql`
  query PastSessions($limit: Int!, $cursor: String) {
    pastSessions(limit: $limit, cursor: $cursor) {
      hasMore
      sessions {
        ...FullSession
      }
    }
  }
  ${FullSessionFragmentDoc}
`;

export function usePastSessionsQuery(
  options: Omit<Urql.UseQueryArgs<PastSessionsQueryVariables>, "query">
) {
  return Urql.useQuery<PastSessionsQuery, PastSessionsQueryVariables>({
    query: PastSessionsDocument,
    ...options,
  });
}
export const SessionDocument = gql`
  query Session($id: Int!) {
    session(id: $id) {
      ...FullSession
    }
  }
  ${FullSessionFragmentDoc}
`;

export function useSessionQuery(
  options: Omit<Urql.UseQueryArgs<SessionQueryVariables>, "query">
) {
  return Urql.useQuery<SessionQuery, SessionQueryVariables>({
    query: SessionDocument,
    ...options,
  });
}
export const SessionCommentsDocument = gql`
  query SessionComments($sessionId: Int!) {
    sessionComments(sessionId: $sessionId) {
      id
      text
      sessionId
      creator {
        ...FullActor
      }
      createdAt
      updatedAt
    }
  }
  ${FullActorFragmentDoc}
`;

export function useSessionCommentsQuery(
  options: Omit<Urql.UseQueryArgs<SessionCommentsQueryVariables>, "query">
) {
  return Urql.useQuery<SessionCommentsQuery, SessionCommentsQueryVariables>({
    query: SessionCommentsDocument,
    ...options,
  });
}
export const UpcomingSessionsDocument = gql`
  query UpcomingSessions($limit: Int!, $cursor: String) {
    upcomingSessions(limit: $limit, cursor: $cursor) {
      hasMore
      sessions {
        ...FullSession
      }
    }
  }
  ${FullSessionFragmentDoc}
`;

export function useUpcomingSessionsQuery(
  options: Omit<Urql.UseQueryArgs<UpcomingSessionsQueryVariables>, "query">
) {
  return Urql.useQuery<UpcomingSessionsQuery, UpcomingSessionsQueryVariables>({
    query: UpcomingSessionsDocument,
    ...options,
  });
}
