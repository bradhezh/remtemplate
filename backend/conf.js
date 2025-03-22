// dotenv sets env vars from .env (in the cwd)
require('dotenv').config()

const conf = require('../conf')

// env vars from cli
conf.NODE_ENV = process.env.NODE_ENV
conf.NODE_ENV_PRO = 'production'
conf.NODE_ENV_DEV = 'development'

conf.PORT = process.env.PORT || 3000

module.exports = conf
