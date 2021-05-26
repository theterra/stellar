const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');
const webpackMerge = require('webpack-merge');
const project = require('../../config/project/');
const modulePaths = require('./build-utils/paths.js');
const modules = require('../../config/modules.js')(modulePaths);

module.exports = ({ mode } = { mode: 'production' }) => {
    return webpackMerge({
        mode,
        devtool: mode === 'development' ? 'source-map' : 'none',
        entry: { server: project.paths.server('src/app.js') },
        output: {
            path: project.paths.build('server'),
            filename: 'bundle.js',
        },
        target: 'node',
        node: {
            console: true,
            __dirname: false, // if you don't put this is, __dirname
            __filename: false, // and __filename return blank or /
        },
        resolve: {
            extensions: ['.js'],
            modules: ['node_modules', 'packages'].concat(modules.additionalModulePaths || []),
            alias: {
                'root-config': project.paths.config('.'),
                'client-webpack': project.paths.client('webpack.config.js'),
                ...(modules.webpackAliases || {}),
            },
        },
        externals: [nodeExternals()],
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.(graphql|gql)$/,
                    exclude: /node_modules/,
                    loader: 'graphql-tag/loader',
                },
            ],
        },
        plugins: [
            new NodemonPlugin({
                nodeArgs: ['--inspect'],
                script: project.paths.base('app.js'),
            }),
        ],
    });
};
