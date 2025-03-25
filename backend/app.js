const express = require('express')
require('express-async-errors')
const {
  MikroORM,
  RequestContext,
} = require('@mikro-orm/core')

const conf = require('./conf')
// export before circular dependency
const DI = {}
module.exports = {
  DI,
}
const itemsRouter = require('./controllers/items')

const app = express()

const init = async () => {
  // relative to cwd
  app.use(express.static('../dist'))
  app.use(express.json())

  app.get('/', (req, res) => {
    res.send('<h1>Hello world!</h1>')
  })
  // for deployment or health check
  app.get('/version', (req, res) => {
    res.send('0')
  })

  DI.db = await MikroORM.init()
  DI.em = DI.db.em
  console.log('the database is connected')
  // just before middleware using an em
  app.use((req, res, next) => {
    RequestContext.create(DI.em, next)
  })

  app.use(conf.ITEMS_EP, itemsRouter)
}

module.exports.app = app
module.exports.init = init
