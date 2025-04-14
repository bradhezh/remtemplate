// dotenv sets env vars from .env (in the cwd, only used locally)
require('dotenv').config()

const conf = require('../conf')

conf.NODE_ENV_PRO = 'production'
conf.NODE_ENV_DBG = 'debug'
conf.NODE_ENV_DEV = 'development'
conf.NODE_ENV_TST = 'test'
// set by cli
conf.NODE_ENV = process.env.NODE_ENV

// set by dotenv locally, or set in the cloud (excluding test-only configs, and
// PORT is auto set), and default values for cicd, but flexible or sensitive
// configs for testing should be defined as cicd env vars rather than providing
// default values; production high security demanded configs can be fetched from
// cloud secret services
conf.PORT = Number(process.env.PORT) || 3000
conf.TOKEN_EXPIRE= Number(process.env.TOKEN_EXPIRE) || 86400
conf.SALT = Number(process.env.SALT) || 5
conf.ADMIN_INIT_USERNAME = process.env.ADMIN_INIT_USERNAME || 'admin'
conf.ADMIN_INIT_PASSWORD = process.env.ADMIN_INIT_PASSWORD || '88888888'
// test-only; also flexible or sensitive for testing
conf.DB_NAME_TEST = process.env.DB_NAME_TEST
conf.DB_URL_LOG_TEST = process.env.DB_URL_LOG_TEST

conf.ERR_USERS_PASSWORD =
  `Password must be at least ${conf.PASSWORD_MIN} characters`

// only set in the cloud with production high security demanded configs stored
// in its secret service (only on azure or aws so far)
conf.SECRETS_HOST = process.env.SECRETS_HOST
// the app name in the cloud
conf.HOST_APP = process.env.HOST_APP
// the region name on aws
conf.HOST_REGION = process.env.HOST_REGION

// production high security demanded configs
if (!conf.SECRETS_HOST) {
  // no secret service used, still from env vars
  conf.DB_NAME = process.env.DB_NAME
  conf.DB_URL_LOG = process.env.DB_URL_LOG
  conf.SECRET = process.env.SECRET || 'alskjfeoicvinef'
} else {
  /* note that the fetching func is "async" and should be waited for
  const FetchSecrets = require('@bradhezh/secrets')
  const fetch = FetchSecrets(conf.SECRETS_HOST, conf.HOST_APP, conf.HOST_REGION)
  conf.fetchSecrets = async () => {
    conf.DB_NAME = await fetch('DB_NAME')
    conf.DB_URL_LOG = await fetch('DB_URL_LOG')
    conf.SECRET = await fetch('SECRET')
  }
  */
}

module.exports = conf
