const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'inline-source-map',
    entry: {
        app: './src/main.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            include: [
                './src'
            ],
        }]
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve('dist')
    },
    resolve: {
        alias: {
            src: './src'
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
          title: 'Chat',
          template: './index.html'
        })
    ],
    watch: true
};