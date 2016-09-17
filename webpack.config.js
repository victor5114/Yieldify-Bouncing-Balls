const webpack = require('webpack');
const path = require('path');
const loaders = require('./webpack.loaders');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || '8888';

const CCS_LOAD_STR = 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]';
const DEST = './';

// global css
loaders.push({
  test: /[\/\\](node_modules|global)[\/\\].*\.css$/,
  loaders: [
    'style?sourceMap',
    'css',
  ],
});
// local scss modules
loaders.push({
  test: /[\/\\]app[\/\\].*\.scss/,
  loaders: [
    'style?sourceMap',
    CCS_LOAD_STR,
    'sass',
  ],
});

// local css modules
loaders.push({
  test: /[\/\\]app[\/\\].*\.css/,
  loaders: [
    'style?sourceMap',
    CCS_LOAD_STR,
  ],
});

module.exports = {
  entry: [
    `webpack-dev-server/client?http://${HOST}:${PORT}`,
    'webpack/hot/only-dev-server',
    './app/index.jsx', // The appʼs entry point
  ],
  devtool: process.env.WEBPACK_DEVTOOL || 'inline-source-map',
  output: {
    path: path.join(__dirname, DEST),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders,
  },
  devServer: {
    contentBase: './',
    // do not print bundle build stats
    noInfo: true,
    // enable HMR
    hot: true,
    // embed the webpack-dev-server runtime into the bundle
    inline: true,
    // serve index.html in place of 404 responses to allow HTML5 history
    historyApiFallback: true,
    port: PORT,
    host: HOST,
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './app/index.html',
    }),
  ],
};
