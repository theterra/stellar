export default {
    Query: {
        me: (_root, _args, ctx) => {
            return ctx.currentUser;
        },
    },
    User: {
        id: (user) => user.id,
        username: (user) => user.username,
    },
};
