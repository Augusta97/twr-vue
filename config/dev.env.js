'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  VUE_APP_DB_API: '"http://localhost:2000/"',
  VUE_APP_DIR_PATH: '"file:///C:/express"'
})
