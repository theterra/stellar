import express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';

import project from 'root-config/project';
import logger from 'helpers/Logger';

export default (app) => {
    app.use(
        require('express-pino-logger')({
            logger: logger,
        }),
    );

    // Enable Compress
    app.use(compression());

    // Parse JSON for POST requests
    app.use(express.json());

    // Encode url for FORM data requests
    app.use(express.urlencoded({ extended: true }));

    // Parse cookies
    app.use(cookieParser());

    // allow cross origin
    app.use(cors());

    // Serve static assets from ~/public
    app.use(express.static(project.paths.base('public')));

    // Serve static assets from ~/build/client/static
    app.use('/static', express.static(project.paths.build('client', 'static')));
};
