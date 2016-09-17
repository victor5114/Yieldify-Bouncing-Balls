const webpack = require('webpack');
const path = require('path');
const loaders = require('./webpack.loaders');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');


const CCS_LOAD_STR = 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]';
const DEST = './build';

// local css modules
loaders.push({
  test: /[\/\\]app[\/\\].*\.css/,
  loader: ExtractTextPlugin.extract('style', CCS_LOAD_STR),
});

// local scss modules
loaders.push({
  test: /[\/\\]app[\/\\].*\.scss/,
  loader: ExtractTextPlugin.extract('style', CCS_LOAD_STR, 'sass'),
});

// global css files
loaders.push({
  test: /[\/\\](node_modules|global)[\/\\].*\.css$/,
  loader: ExtractTextPlugin.extract('style', 'css'),
});

module.exports = {
  entry: [
    './app/index.jsx',
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
      template: './app/index.html',
      title: 'Webpack App',
    }),
    new webpack.optimize.DedupePlugin(),
  ],
};
