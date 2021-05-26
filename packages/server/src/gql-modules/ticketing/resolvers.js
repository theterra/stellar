import TicketingService from 'services/Ticketing';

const ticketingService = new TicketingService();

export default {
    Query: {
        ticket: (root, { id }, ctx, info) => {
            return {
                id: id,
                title: 'Ticket 01',
                content: 'This was a mistake',
                user: ctx.currentUser.role,
            };
        },
        tickets: (_root, _args, ctx, info) => {
            return ticketingService.getData();
        },
    },
};
