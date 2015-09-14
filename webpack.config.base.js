'use strict';

var path = require('path');

module.exports = {
    entry: ['./app/render/scripts/index.js'],
    /*
    externals: {
        'babel-core': {
            root: 'BabelCore',
            commonjs2: 'babel-core',
            commonjs: 'babel-core',
            amd: 'babel-core',
        },
        react: {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react',
        },
    },
    */
    externals: [
        'babel-core',
        'babel-core/polyfill',
        'react',
    ],
    module: {
        loaders: [{
            loaders: ['style-loader', 'css-loader'],
            test: /\.css?$/,
        }, {
            exclude: /node_modules/,
            loaders: ['babel-loader'],
            test: /\.js$/,
        }],
    },
    output: {
        filename: 'bundle.js',
        library: 'SampleElectronApp',
        libraryTarget: 'commonjs2',
        path: path.join(__dirname, '.tmp', 'render', 'static'),
        publicPath: '/static/',
    },
    resolve: {
        extensions: ['', '.js', 'jsx'],
    },
    target: 'atom',
};
