const env = require('./environment');

exports.config = {
  onPrepare: function() {
    browser.ignoreSynchronization = true;
  },
  specs: ['tests/*.js'],
  capabilities: env.capabilities,
  baseUrl: 'http://localhost:9000',
  framework: 'mocha',
};
