'use strict'
const configURL = require('./config')
module.exports = Object.assign({
  NODE_ENV: '"development"',
  ENV_CONFIG: '"dev"',
  MOCK: false
}, configURL.testConfig)