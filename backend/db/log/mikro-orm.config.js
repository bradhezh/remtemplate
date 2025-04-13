const {defineConfig} = require('@mikro-orm/mongodb')

const conf = require('../../conf')

module.exports = defineConfig({
  clientUrl: conf.NODE_ENV === conf.NODE_ENV_TST
    ? conf.DB_URL_LOG_TEST : conf.DB_URL_LOG,
  ensureIndexes: true, implicitTransactions: true,
  entities: ['./db/log/entities'],
  migrations: {
    path:
      __dirname
      + (conf.NODE_ENV === conf.NODE_ENV_TST
        ? '/migrationstest' : '/migrations'),
    emit: 'js',
  },
  debug: conf.NODE_ENV !== conf.NODE_ENV_PRO ? true : false,
})
