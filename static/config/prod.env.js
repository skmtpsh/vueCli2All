'use strict'
const configURL = require('./config')
module.exports = Object.assign({
  NODE_ENV: '"production"',
  ENV_CONFIG: '"prod"',
  MOCK: false
}, configURL.proConfig)