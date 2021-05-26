const webpack = require('webpack');
const project = require('../../../config/project/');

module.exports = () => {
    return {
        mode: 'development',
        devtool: 'source-map',
        entry: [
            'react-hot-loader/patch',
            'webpack-hot-middleware/client',
            project.paths.client('src/index.js'),
        ],
        output: {
            filename: 'static/js/[name].bundle.js',
            chunkFilename: 'static/js/[name].chunk.js',
            publicPath: '/',
        },
        devServer: {
            publicPath: '',
            hot: true,
            contentBase: project.paths.base('build', 'client'),
            overlay: {
                warnings: false,
                errors: true,
            },
            headers: { 'X-Custom-Header': 'yes' },
            lazy: false,
            stats: {
                chunks: false,
                chunkModules: false,
                colors: true,
                optimizationBailout: true,
            },
            serverSideRender: true,
        },
        plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin()],
    };
};
