import path from 'path';
import nunjucks from 'nunjucks';
import { FileMinifyLoader } from 'nunjucks-minify-loaders';
import project from 'root-config/project';
import serverConfig from 'config/site.meta';

export default (app) => {
    app.set('view engine', 'html');
    const options = {
        watch: false,
        noCache: false,
        minify: {
            collapseWhitespace: true,
            minifyJS: true,
            removeComments: true,
        },
    };

    const loader = new FileMinifyLoader(
        path.join(project.paths.server(), 'src/templates'),
        options,
    );

    const env = new nunjucks.Environment(loader, {
        autoescape: true,
        lstripBlocks: true,
        trimBlocks: true,
    });

    const getFromBuildManifest = (file, ext) => {
        const filename = `${file}.${ext}`;
        return app.locals.buildManifest[filename] || '';
    };

    env.addFilter('jslink', (file) => {
        const filename = getFromBuildManifest(file, 'js');
        return filename;
    });

    env.addGlobal('serverConfig', serverConfig);
    env.addGlobal('isProd', process.env.NODE_ENV === 'production');
    env.express(app);
};
