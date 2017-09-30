const path = require('path');
const paths = require('./paths');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: {
        app: paths.src + '/index.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            include: [
                paths.src
            ],
        }]
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve('dist')
    },
    resolve: {
        alias: {
            server: './server',
            src: paths.src,
            test: paths.clientTest
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
          title: 'Power Rankings',
          template: './index.html'
        })
    ]
};
