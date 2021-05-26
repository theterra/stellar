import ViewHtml from 'views/Html';
import { STATUS_CODES } from 'http';

export default (app) => {
    app.use((err, req, res, next) => {
        if (!req.xhr) {
            // TODO: change it to 500
            return new ViewHtml(req, res, 'error/404').render();
        }

        if (res.headersSent) {
            return next(err);
        }

        res.status(err.status || 500).json({
            statusCode: 1,
            message: err.message || STATUS_CODES[err.status],
            payload: err.payload,
        });
    });
};
