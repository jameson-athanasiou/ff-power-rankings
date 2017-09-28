const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
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
          title: 'Power Rankings',
          template: './index.html'
        })
    ]
};