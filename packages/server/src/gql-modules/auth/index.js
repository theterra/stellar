import { GraphQLModule } from '@graphql-modules/core';
import * as typeDefs from './schema.gql';
import resolvers from './resolvers';

const HEADER_NAME = 'authorization';

const AuthModule = new GraphQLModule({
    name: 'auth',
    typeDefs,
    resolvers,
    context: ({ req }) => {
        let authToken = null;
        let currentUser = null;

        try {
            authToken = req.headers[HEADER_NAME] || 'token';
            if (authToken) {
                // validate call from service/ db

                //test user
                currentUser = {
                    id: 1,
                    username: 'John',
                    role: 'ADMIN',
                };
            }
        } catch (e) {
            req.log.warn('Unable to authenticate');
        }

        return {
            currentUser,
            authToken,
        };
    },
});

export default AuthModule;
