import { GraphQLModule } from '@graphql-modules/core';
import * as typeDefs from './schema.gql';
import resolvers from './resolvers';
import AuthModule from 'gql-modules/auth';

const TicketingModule = new GraphQLModule({
    typeDefs,
    resolvers,
    imports: [AuthModule],
});

export default TicketingModule;
