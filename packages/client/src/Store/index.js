import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

import { resolvers, typeDefs } from './user';

const cache = new InMemoryCache();
const link = new HttpLink({
    uri: '/graphql',
});

export const gqlClient = new ApolloClient({
    link,
    cache,
    typeDefs,
    resolvers,
});
