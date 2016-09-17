import express from 'express';
import http from 'http';
import dotenv from 'dotenv-safe';
import expressConfig from './config';
import envConfig from './config/environment';
import routes from './routes';

/**
 * @description Configure env variables
 * @param config
 */
dotenv.load({
  path: `${__dirname}/config/.env`,
  sample: `${__dirname}/.env.example`,
  allowEmptyValues: false,
});

// Setup server
const app = express();
const server = http.createServer(app);

// Init config
expressConfig(app);
// Init route
routes(app);

// Start server
server.listen(envConfig.port, envConfig.ip, () => {
  console.log('Express server listening on %d, in %s mode', envConfig.port, app.get('env'));
});


// Expose app
exports = module.exports = app;
