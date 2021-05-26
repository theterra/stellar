export const authenticated = (next) => (root, args, context, info) => {
    if (!context.currentUser) {
        throw new Error('Unauthenticated');
    }

    return next(root, args, context, info);
};

export const authorized = (role) => (next) => (root, args, context, info) => {
    if (role && ![...role].includes(context.currentUser.role)) {
        throw new Error('Unauthorized');
    }

    return next(root, args, context, info);
};
