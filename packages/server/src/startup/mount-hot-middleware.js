import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpack from 'webpack';
import webpackConfig from 'client-webpack';

export default (app) => {
    const config = webpackConfig({ mode: 'development' });
    const compiler = webpack(config);
    app.use(webpackDevMiddleware(compiler, config.devServer));
    app.use(webpackHotMiddleware(compiler));
    app.use('*', saveBuildManifest(app));
};

function saveBuildManifest(app) {
    return (_req, res, next) => {
        const assetsByChunkName = res.locals.webpackStats.toJson().assetsByChunkName;
        const buildManifest = {};
        Object.entries(assetsByChunkName).forEach(([key, value]) => {
            const ext = 'js';
            const regex = new RegExp(`${key}\\.[a-z0-9]+\\.${ext}$`, 'gi');
            const values = normalizeAssets(value);

            values.forEach((filename) => {
                if (regex.test(filename)) {
                    buildManifest[`${key}.${ext}`] = `${filename}`;
                }
            });
        });

        app.locals.buildManifest = buildManifest;

        next();
    };
}

function normalizeAssets(assets) {
    if (assets && typeof assets === 'object') {
        return Object.values(assets);
    }

    return Array.isArray(assets) ? assets : [assets];
}
