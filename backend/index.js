const conf = require('./conf')
const log = require('./utils/log')
const {app, init} = require('./app')

;(async () => {try {
  await init()

  app.listen(conf.PORT, () => {
    log.info(`the server is running on ${conf.PORT}`)
  })
} catch (err) {
  log.error(`${err.name}: ${err.message}`)
}})()
