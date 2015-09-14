'use strict';

var webpack = require('webpack');
var baseConfig = require('./webpack.config.base');

var config = Object.create(baseConfig);

config.devtool = 'eval';

// Add Webpack Dev Server stuff
config.entry.unshift(
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server'
);

// Add the React hot loader
config.module.loaders.unshift({
    exclude: /node_modules/,
    loaders: ['react-hot-loader'],
    test: /\.js$/,
});

config.plugins = [
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
];

module.exports = config;
