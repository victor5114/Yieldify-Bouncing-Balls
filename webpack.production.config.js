const webpack = require('webpack');
const path = require('path');
const loaders = require('./webpack.loaders');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');

const DEST = './build';

loaders.push({
  test: /[\/\\]src[\/\\].*\.scss/,
  loaders: [
    'style?sourceMap',
    'css',
    'sass',
  ],
});

// local css modules
loaders.push({
  test: /[\/\\]src[\/\\].*\.css/,
  loaders: [
    'style?sourceMap',
    'css',
  ],
});
// global scss
loaders.push({
  test: /[\/\\](node_modules|global)[\/\\].*\.scss$/,
  loaders: [
    'style',
    'css',
    'sass',
  ],
});
// global css files
loaders.push({
  test: /[\/\\](node_modules|global)[\/\\].*\.css$/,
  loader: ExtractTextPlugin.extract('style', 'css'),
});

module.exports = {
  entry: [
    './src/index.jsx',
  ],
  output: {
    path: path.join(__dirname, DEST),
    filename: '[chunkhash].js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders,
  },
  plugins: [
    new WebpackCleanupPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        drop_console: false,
        drop_debugger: true,
      },
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('[contenthash].css', {
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'Bouncing Balls',
      favicon: './src/static/favicon.ico',
    }),
    new webpack.optimize.DedupePlugin(),
  ],
};
