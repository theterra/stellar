import { gql } from 'apollo-boost';

export const GET_TICKET = gql`
    query Ticket($id: ID!) {
        ticket(id: $id) {
            id
            title
            content
        }
    }
`;
