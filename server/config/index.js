// Express configuration

import express from 'express';
import favicon from 'serve-favicon';
import compression from 'compression';
import errorHandler from 'errorhandler';
import path from 'path';

import config from './environment';

export default function (app) {
  const env = app.get('env');

  if (env === 'development' || env === 'test') {
    app.use(express.static(path.join(config.root, './tmp')));
  }

  if (env === 'production') {
    app.use(favicon(path.join(config.root, 'client', 'favicon.ico')));
  }

  // For this project, ./build is the only content by server
  app.set('appPath', path.join(config.root, 'build'));
  app.use(express.static(app.get('appPath')));

  app.use(compression());

  if (env === 'development' || env === 'test') {
    app.use(errorHandler()); // Error handler - has to be last
  }
}
