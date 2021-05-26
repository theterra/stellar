import { ApolloServer } from 'apollo-server-express';
import AppModule from 'gql-modules';

export default (app) => {
    const apolloServer = new ApolloServer({
        schema: AppModule.schema,
        context: AppModule.context,
    });

    apolloServer.applyMiddleware({ app });
};
