// dotenv sets env vars from .env (in the cwd, only used in local development)
require('dotenv').config()

const conf = require('../conf')

conf.TOKEN_EXPIRE = 24 * 60 * 60
conf.ADMIN_ROLE = 'Admin'
conf.OWNER_ROLE = 'Owner'

// the env var is set by cli
conf.NODE_ENV = process.env.NODE_ENV
conf.NODE_ENV_PRO = 'production'
conf.NODE_ENV_DEV = 'development'
conf.NODE_ENV_TST = 'test'

// the env var is set by dotenv in local development, or auto set in the cloud;
// default values should be provided for other envs like cicd pipelines
conf.PORT = process.env.PORT || 3000
conf.SECRET = process.env.SECRET || 'alskjfeoicvinef'
conf.SALT = Number(process.env.SALT) || 5
conf.ADMIN_INIT_USER = process.env.ADMIN_INIT_USER || 'admin'
conf.ADMIN_INIT_PASSWD = process.env.ADMIN_INIT_PASSWD || '88888888'

// the env vars are only set in the cloud with sensitive configs stored in its
// secret service (only on azure or aws so far)
conf.SECRETS_HOST = process.env.SECRETS_HOST
// the app name in the cloud
conf.HOST_APP = process.env.HOST_APP
// the region name on aws
conf.HOST_REGION = process.env.HOST_REGION

if (!conf.SECRETS_HOST) {
  // without SECRETS_HOST, sensitive configs should be from env vars; in local
  // development, they are set by dotenv, in the cloud, (only) non-testing ones
  // are set in deployment, and in cicd pipelines, (only) testing ones are set
  // a non-testing sensitive config
  conf.DB_NAME = process.env.DB_NAME
  // a testing sensitive config
  conf.DB_NAME_TEST = process.env.DB_NAME_TEST
  /* mongo
  conf.DB_URL = process.env.DB_URL
  conf.DB_URL_TEST = process.env.DB_URL_TEST
  */
} else {
  /* with SECRETS_HOST set, (non-testing) sensitive configs should be fetched
    from the secret service; note that the fetching func is "async" and needs to
    be waited for
  const FetchSecrets = require('@bradhezh/secrets')
  const fetch = FetchSecrets(conf.SECRETS_HOST, conf.HOST_APP, conf.HOST_REGION)
  conf.fetchSecrets = async () => {
    conf.DB_NAME = await fetch('DB_NAME')
    // mongo
    //conf.DB_URL = await fetch('DB_URL')
  }
  */
}

module.exports = conf
