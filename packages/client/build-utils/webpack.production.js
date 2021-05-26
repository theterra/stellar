const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

const project = require('../../../config/project/');

module.exports = () => {
    return {
        mode: 'production',
        entry: [project.paths.client('src/index.js')],
        output: {
            filename: 'static/js/[name].[contenthash].js',
            chunkFilename: 'static/js/[name].[contenthash].js',
            publicPath: '/',
        },
        externals: {
            react: 'React',
            'react-dom': 'ReactDOM',
        },
        optimization: {
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        parse: {
                            ecma: 8,
                        },
                        compress: {
                            ecma: 5,
                            warnings: false,
                            comparisons: false,
                            inline: 2,
                        },
                        mangle: {
                            safari10: true,
                        },

                        output: {
                            ecma: 5,
                            comments: false,
                            ascii_only: true,
                        },
                    },
                    sourceMap: false,
                }),
            ],
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                        priority: -1,
                    },
                    default: {
                        minChunks: Infinity,
                    },
                },
            },
            runtimeChunk: {
                name: 'manifest',
            },
        },
        plugins: [
            new webpack.NamedChunksPlugin((chunk) => {
                if (chunk.name) {
                    return chunk.name;
                }
                return chunk.modules.map((m) => path.relative(m.context, m.request)).join('_');
            }),
        ],
        performance: {
            hints: 'warning',
            maxEntrypointSize: 4000000,
            maxAssetSize: 4000000,
            assetFilter: function (assetFilename) {
                return !/\.map$/.test(assetFilename);
            },
        },
    };
};
