import { gql } from 'apollo-boost';

export const typeDefs = gql`
    extend type Query {
        isLoggedIn: Boolean!
        cartItems: [ID!]!
    }

    extend type Launch {
        isInCart: Boolean!
    }

    extend type Mutation {
        addOrRemoveFromCart(id: ID!): [ID!]!
    }
`;

export const resolvers = {
    Query: {
        cartItems: () => [1222],
    },
};
