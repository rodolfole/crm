import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

const authLink = setContext((_, { headers }) => {
  const token = window.localStorage.getItem("token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path, extensions }) => {
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        );
      });
    }
    if (networkError) console.log(`[Network error]: ${networkError}`);
  }
);

const httpLink = new HttpLink({
  uri: "http://localhost:9000/api",
});

const client = new ApolloClient({
  connectToDevTools: true,
  link: errorLink.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          clientsSeller: {
            keyArgs: false,
            merge(_, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
});

export default client;
