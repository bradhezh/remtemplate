// for both the cli and app

const {defineConfig} = require('@mikro-orm/better-sqlite')
/* mysql
const {defineConfig} = require('@mikro-orm/mysql')
*/

const conf = require('../conf')

module.exports = defineConfig({
  /* can be inferred from the package imported
  driver: BetterSqliteDriver,
  */
  dbName: conf.NODE_ENV === conf.NODE_ENV_TST
    ? conf.DB_NAME_TEST : conf.DB_NAME,
  /* mysql
  host: 'host', user: 'user', password: 'password',
  */
  // the config is in fact used by mikro, so "entities" here is also configured
  // for mikro (rather than app code) to find entity classes and their schemas
  // (metadata, eventually provided by mikro's metadata provider)
  entities: ['./db/entities'],
  migrations: {
    path:
      __dirname
      + (conf.NODE_ENV === conf.NODE_ENV_TST
        ? '/migrationstest' : '/migrations'),
    emit: 'js',
  },
  /* as default since v4
  metadataProvider: ReflectMetadataProvider,
  */
  debug: conf.NODE_ENV !== conf.NODE_ENV_PRO ? true : false,
  /* limitations of the connection pool
  pool: {min: 2, max: 100},
  */
})
