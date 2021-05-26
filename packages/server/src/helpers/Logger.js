import pino from 'pino';

const logger = pino({
    name: 'stellar',
    safe: true,
    serializers: {
        req: pino.stdSerializers.req,
        res: pino.stdSerializers.res,
        err: pino.stdSerializers.err,
    },
});

export default logger;
