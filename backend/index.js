const conf = require('./conf')
const {
  app,
  init,
} = require('./app')

;(async () => {try {
  await init()

  app.listen(conf.PORT, () => {
    console.log(`the server is running on ${conf.PORT}`) 
  })

} catch (err) {
  console.log(`${err.name}: ${err.message}`)
}})()
