// for both the cli and app

const {
  defineConfig,
} = require('@mikro-orm/better-sqlite')
/* mysql
const {
  defineConfig,
} = require('@mikro-orm/mysql')
*/
/* mongo
const {
  defineConfig,
} = require('@mikro-orm/mongodb')
*/

const conf = require('./conf')

module.exports = defineConfig({
  /* can be inferred from the package imported
  driver: BetterSqliteDriver,
  */
  dbName: 'data.sqlite',
  /* mysql
  host: 'host',
  dbName: 'database',
  user: 'user',
  password: 'password',
  */
  /* mongo
  clientUrl: 'connection_string',
  // false by default for mongo
  ensureIndexes: true,
  implicitTransactions: true,
  */
  // the config is in fact used by mikro, so "entities" here is also configured
  // for mikro (rather than app code) to find entity classes and their schemas
  // (metadata, eventually provided by mikro's metadata provider)
  entities: [
    './entities',
  ],
  migrations: {
    path: './migrations',
    emit: 'js',
  },
  /* as default since v4
  metadataProvider: ReflectMetadataProvider,
  */
  debug: conf.NODE_ENV === conf.NODE_ENV_DEV ? true : false,
  /* limitations of the connection pool
  pool: {
    min: 2,
    max: 100,
  },
  */
})
