const path = require('path');
const paths = require('./config/paths');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'eval-source-map',
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
        }, {
            test: /\.json$/,
            loader: 'json-loader',
            include: [
                paths.src
            ],
        },  {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }]
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve('dist')
    },
    resolve: {
        alias: {
            json: paths.json,
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
