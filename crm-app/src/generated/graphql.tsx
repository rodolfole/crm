import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type ClientInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
};

export type Clients = {
  __typename?: 'Clients';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['Float'];
  lastName: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  seller: Users;
  sellerId: Scalars['Float'];
  updatedAt: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  jwt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createClient: Clients;
  deleteClient: Scalars['Int'];
  existUser?: Maybe<Scalars['Boolean']>;
  login: LoginResponse;
  register: Users;
  updateClient: Clients;
};


export type MutationCreateClientArgs = {
  input: ClientInput;
};


export type MutationDeleteClientArgs = {
  id: Scalars['Int'];
};


export type MutationExistUserArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRegisterArgs = {
  input: UserInput;
};


export type MutationUpdateClientArgs = {
  id: Scalars['Int'];
  input: ClientInput;
};

export type Query = {
  __typename?: 'Query';
  client: Clients;
  clients: Array<Clients>;
  clientsSeller: Array<Clients>;
  users: Array<Users>;
};


export type QueryClientArgs = {
  id: Scalars['Int'];
};


export type QueryClientsSellerArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
};

export type UserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

export type Users = {
  __typename?: 'Users';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['Float'];
  lastName: Scalars['String'];
  status: Scalars['Boolean'];
  updatedAt: Scalars['String'];
};

export type ClientQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ClientQuery = { __typename?: 'Query', client: { __typename?: 'Clients', id: number, email: string } };

export type ClientsSellerQueryVariables = Exact<{ [key: string]: never; }>;


export type ClientsSellerQuery = { __typename?: 'Query', clientsSeller: Array<{ __typename?: 'Clients', id: number, createdAt: string, email: string, firstName: string, lastName: string, phone?: string | null, sellerId: number }> };

export type CreateClientMutationVariables = Exact<{
  input: ClientInput;
}>;


export type CreateClientMutation = { __typename?: 'Mutation', createClient: { __typename?: 'Clients', id: number, createdAt: string, email: string, firstName: string, lastName: string, phone?: string | null, sellerId: number } };

export type DeleteClientMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteClientMutation = { __typename?: 'Mutation', deleteClient: number };

export type UpdateClientMutationVariables = Exact<{
  id: Scalars['Int'];
  input: ClientInput;
}>;


export type UpdateClientMutation = { __typename?: 'Mutation', updateClient: { __typename?: 'Clients', id: number, createdAt: string, email: string, firstName: string, lastName: string, phone?: string | null, sellerId: number } };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'Users', id: number, email: string }> };

export type ExistUserMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ExistUserMutation = { __typename?: 'Mutation', existUser?: boolean | null };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', jwt: string } };

export type RegisterMutationVariables = Exact<{
  input: UserInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'Users', id: number, email: string, firstName: string, lastName: string } };


export const ClientDocument = gql`
    query Client($id: Int!) {
  client(id: $id) {
    id
    email
  }
}
    `;

/**
 * __useClientQuery__
 *
 * To run a query within a React component, call `useClientQuery` and pass it any options that fit your needs.
 * When your component renders, `useClientQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClientQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useClientQuery(baseOptions: Apollo.QueryHookOptions<ClientQuery, ClientQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ClientQuery, ClientQueryVariables>(ClientDocument, options);
      }
export function useClientLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ClientQuery, ClientQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ClientQuery, ClientQueryVariables>(ClientDocument, options);
        }
export type ClientQueryHookResult = ReturnType<typeof useClientQuery>;
export type ClientLazyQueryHookResult = ReturnType<typeof useClientLazyQuery>;
export type ClientQueryResult = Apollo.QueryResult<ClientQuery, ClientQueryVariables>;
export const ClientsSellerDocument = gql`
    query ClientsSeller {
  clientsSeller {
    id
    createdAt
    email
    firstName
    lastName
    phone
    sellerId
  }
}
    `;

/**
 * __useClientsSellerQuery__
 *
 * To run a query within a React component, call `useClientsSellerQuery` and pass it any options that fit your needs.
 * When your component renders, `useClientsSellerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClientsSellerQuery({
 *   variables: {
 *   },
 * });
 */
export function useClientsSellerQuery(baseOptions?: Apollo.QueryHookOptions<ClientsSellerQuery, ClientsSellerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ClientsSellerQuery, ClientsSellerQueryVariables>(ClientsSellerDocument, options);
      }
export function useClientsSellerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ClientsSellerQuery, ClientsSellerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ClientsSellerQuery, ClientsSellerQueryVariables>(ClientsSellerDocument, options);
        }
export type ClientsSellerQueryHookResult = ReturnType<typeof useClientsSellerQuery>;
export type ClientsSellerLazyQueryHookResult = ReturnType<typeof useClientsSellerLazyQuery>;
export type ClientsSellerQueryResult = Apollo.QueryResult<ClientsSellerQuery, ClientsSellerQueryVariables>;
export const CreateClientDocument = gql`
    mutation CreateClient($input: ClientInput!) {
  createClient(input: $input) {
    id
    createdAt
    email
    firstName
    lastName
    phone
    sellerId
  }
}
    `;
export type CreateClientMutationFn = Apollo.MutationFunction<CreateClientMutation, CreateClientMutationVariables>;

/**
 * __useCreateClientMutation__
 *
 * To run a mutation, you first call `useCreateClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createClientMutation, { data, loading, error }] = useCreateClientMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateClientMutation(baseOptions?: Apollo.MutationHookOptions<CreateClientMutation, CreateClientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateClientMutation, CreateClientMutationVariables>(CreateClientDocument, options);
      }
export type CreateClientMutationHookResult = ReturnType<typeof useCreateClientMutation>;
export type CreateClientMutationResult = Apollo.MutationResult<CreateClientMutation>;
export type CreateClientMutationOptions = Apollo.BaseMutationOptions<CreateClientMutation, CreateClientMutationVariables>;
export const DeleteClientDocument = gql`
    mutation DeleteClient($id: Int!) {
  deleteClient(id: $id)
}
    `;
export type DeleteClientMutationFn = Apollo.MutationFunction<DeleteClientMutation, DeleteClientMutationVariables>;

/**
 * __useDeleteClientMutation__
 *
 * To run a mutation, you first call `useDeleteClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteClientMutation, { data, loading, error }] = useDeleteClientMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteClientMutation(baseOptions?: Apollo.MutationHookOptions<DeleteClientMutation, DeleteClientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteClientMutation, DeleteClientMutationVariables>(DeleteClientDocument, options);
      }
export type DeleteClientMutationHookResult = ReturnType<typeof useDeleteClientMutation>;
export type DeleteClientMutationResult = Apollo.MutationResult<DeleteClientMutation>;
export type DeleteClientMutationOptions = Apollo.BaseMutationOptions<DeleteClientMutation, DeleteClientMutationVariables>;
export const UpdateClientDocument = gql`
    mutation UpdateClient($id: Int!, $input: ClientInput!) {
  updateClient(id: $id, input: $input) {
    id
    createdAt
    email
    firstName
    lastName
    phone
    sellerId
  }
}
    `;
export type UpdateClientMutationFn = Apollo.MutationFunction<UpdateClientMutation, UpdateClientMutationVariables>;

/**
 * __useUpdateClientMutation__
 *
 * To run a mutation, you first call `useUpdateClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateClientMutation, { data, loading, error }] = useUpdateClientMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateClientMutation(baseOptions?: Apollo.MutationHookOptions<UpdateClientMutation, UpdateClientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateClientMutation, UpdateClientMutationVariables>(UpdateClientDocument, options);
      }
export type UpdateClientMutationHookResult = ReturnType<typeof useUpdateClientMutation>;
export type UpdateClientMutationResult = Apollo.MutationResult<UpdateClientMutation>;
export type UpdateClientMutationOptions = Apollo.BaseMutationOptions<UpdateClientMutation, UpdateClientMutationVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    id
    email
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const ExistUserDocument = gql`
    mutation ExistUser($email: String!) {
  existUser(email: $email)
}
    `;
export type ExistUserMutationFn = Apollo.MutationFunction<ExistUserMutation, ExistUserMutationVariables>;

/**
 * __useExistUserMutation__
 *
 * To run a mutation, you first call `useExistUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useExistUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [existUserMutation, { data, loading, error }] = useExistUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useExistUserMutation(baseOptions?: Apollo.MutationHookOptions<ExistUserMutation, ExistUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ExistUserMutation, ExistUserMutationVariables>(ExistUserDocument, options);
      }
export type ExistUserMutationHookResult = ReturnType<typeof useExistUserMutation>;
export type ExistUserMutationResult = Apollo.MutationResult<ExistUserMutation>;
export type ExistUserMutationOptions = Apollo.BaseMutationOptions<ExistUserMutation, ExistUserMutationVariables>;
export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    jwt
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($input: UserInput!) {
  register(input: $input) {
    id
    email
    firstName
    lastName
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;