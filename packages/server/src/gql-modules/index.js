import { GraphQLModule } from '@graphql-modules/core';
import AuthModule from './auth';
import TicketingModule from './ticketing';

import { resolversComposition } from './resolvers-composition';

const AppModule = new GraphQLModule({
    name: 'App',
    imports: [AuthModule, TicketingModule],
    resolversComposition,
});

export default AppModule;
