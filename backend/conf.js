// dotenv sets env vars from .env (in the cwd)
require('dotenv').config()

const conf = require('../conf')

// env vars from cli
conf.NODE_ENV = process.env.NODE_ENV
conf.NODE_ENV_PRO = 'production'
conf.NODE_ENV_DEV = 'development'
conf.NODE_ENV_TST = 'test'

conf.PORT = process.env.PORT || 3000
conf.DB_URL = process.env.DB_URL
conf.DB_URL_TEST = process.env.DB_URL_TEST

module.exports = conf
