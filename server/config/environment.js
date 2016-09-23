import path from 'path';

// All configurations will extend these options
// ============================================
const all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(path.resolve(__dirname, '../..')),

  // Server port
  port: process.env.PORT || 9000,

  // Server IP
  ip: process.env.IP || '127.0.0.1',
};
// Export the config object based on the NODE_ENV
// ==============================================
export default all;
