import express from 'express';

import {
    mountUtilityMiddleware,
    mountHotMiddleware,
    setupViewEngine,
    setupServer,
    setupLocals,
    mountRoutes,
    mountErrorHandlers,
    mountApolloServer,
} from 'startup';

import project from 'root-config/project';

// ------------------------------------
// Set CWD to /
// ------------------------------------
project.paths.setBase(process.cwd());

const app = express();

app.all('/health-check', (_req, res) => res.send('OK'));

// -----------------------------------------------------
// Mount Utility middlewares
// json, urlencoded, cookieParser, compression, cors, static files
// -----------------------------------------------------
mountUtilityMiddleware(app);

// -----------------------------------------------------
// Mount Graphql server
// -----------------------------------------------------
mountApolloServer(app);

// -----------------------------------------------------
// Setup build manifest to locals
// -----------------------------------------------------
setupLocals(app);

// -----------------------------------------------------
// Mount hot reload in dev mode
// -----------------------------------------------------
if (process.env.NODE_ENV === 'development') {
    mountHotMiddleware(app);
}

// -----------------------------------------------------
// Setup view engine to serve the HTML
// -----------------------------------------------------
setupViewEngine(app);

// -----------------------------------------------------
// Setup api and web routes
// -----------------------------------------------------
mountRoutes(app);

// -----------------------------------------------------
// Handle errors
// -----------------------------------------------------
mountErrorHandlers(app);

/**
 * Start the express server
 */
setupServer(app);
