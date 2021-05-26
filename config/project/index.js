const path = require('path');
const debug = require('debug')('app:config:project');

debug('Creating default project configuration.');

let dirs = {
    base: './',
    packages: 'packages',
    config: 'config',
    build: 'build',
    client: 'packages/client',
    server: 'packages/server',
    public: 'public',
};

const env = process.env.APP_ENV || 'development';

let config = {
    env: env,
    path_base: path.resolve(__dirname, '..', '..'),
    server: {
        host: '0.0.0.0',
        port: process.env.PORT || 3000,
    },

    paths: {
        base,
        root: base.bind(null, dirs.base),
        packages: base.bind(null, dirs.packages),
        public: base.bind(null, dirs.public),
        config: base.bind(null, dirs.config),
        build: base.bind(null, dirs.build),
        client: base.bind(null, dirs.client),
        server: base.bind(null, dirs.server),
        setBase: setBase,
    },

    public_assets: {
        basePath: '/build/',
        jsPath: '',
    },

    compiler: {
        public_path: '/',
        stats: {
            chunks: false,
            chunkModules: false,
            colors: true,
            optimizationBailout: true,
        },
        build_manifest: 'manifest.json',
    },
};

function base() {
    const args = [config.path_base].concat(Array.from(arguments));
    return path.resolve.apply(path, args);
}

function setBase(base) {
    config.path_base = base;
}

module.exports = config;
module.exports.default = config;
