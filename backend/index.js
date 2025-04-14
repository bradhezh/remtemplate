const conf = require('./conf')
const {app, init} = require('./app')
// don't import middleware before app (express-async-errors)
const {log} = require('./middleware/middleware')

;(async () => {try {

  await init()

  app.listen(conf.PORT, () => {
    log.info(`the server is running on ${conf.PORT}`)
  })

} catch (err) {
  log.error(`${err.name}: ${err.message}`)
}})()
