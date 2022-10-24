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
};

export type Actor = {
  __typename?: 'Actor';
  createdAt: Scalars['String'];
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
  createSession: Session;
  deleteSession: Scalars['Boolean'];
  login: ActorResponse;
  signup: ActorResponse;
  updateSession: Session;
};


export type MutationCreateSessionArgs = {
  title: Scalars['String'];
};


export type MutationDeleteSessionArgs = {
  id: Scalars['Int'];
};


export type MutationLoginArgs = {
  name: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSignupArgs = {
  name: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUpdateSessionArgs = {
  id: Scalars['Int'];
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<Actor>;
  session?: Maybe<Session>;
  sessions: Array<Session>;
};


export type QuerySessionArgs = {
  id: Scalars['Int'];
};

export type Session = {
  __typename?: 'Session';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
  name: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'ActorResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, actor?: { __typename?: 'Actor', id: number, name: string } | null } };

export type SignupMutationVariables = Exact<{
  name: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'ActorResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, actor?: { __typename?: 'Actor', id: number, name: string } | null } };


export const LoginDocument = gql`
    mutation Login($name: String!, $password: String!) {
  login(name: $name, password: $password) {
    errors {
      field
      message
    }
    actor {
      id
      name
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const SignupDocument = gql`
    mutation Signup($name: String!, $password: String!) {
  signup(name: $name, password: $password) {
    errors {
      field
      message
    }
    actor {
      id
      name
    }
  }
}
    `;

export function useSignupMutation() {
  return Urql.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument);
};