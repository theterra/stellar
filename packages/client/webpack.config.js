const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ManifestPlugin = require('webpack-manifest-plugin');

const modulePaths = require('./build-utils/paths.js');
const modules = require('../../config/modules.js')(modulePaths);
const project = require('../../config/project/index.js');

const modeConfig = (mode) => require(`./build-utils/webpack.${mode}`)(mode);
const presetConfig = ({ mode, presets }) => require(`./build-utils/loadPresets`)({ mode, presets });

module.exports = ({ mode, presets } = { mode: 'production', presets: [] }) => {
    const isProductionMode = mode === 'production';
    return webpackMerge(
        {
            target: 'web',
            output: {
                path: project.paths.build('client'),
            },
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        loader: 'babel-loader',
                        exclude: /node_modules/,
                    },
                    {
                        test: /\.(js|jsx)$/,
                        use: 'react-hot-loader/webpack',
                        include: /node_modules/,
                    },
                    {
                        loader: require.resolve('file-loader'),
                        exclude: [/\.(js|mjs)$/, /\.html$/, /\.json$/],
                        options: {
                            name: `static/media/${
                                isProductionMode ? '[name].[hash].[ext]' : '[name].[ext]'
                            }`,
                        },
                    },
                ],
            },
            resolve: {
                modules: ['node_modules'].concat(modules.additionalModulePaths || []),
                alias: {
                    ...(modules.webpackAliases || {}),
                },
            },
            plugins: [new webpack.ProgressPlugin(), new ManifestPlugin()],
        },
        modeConfig(mode),
        presetConfig({ mode, presets }),
    );
};
