const express = require('express')
require('express-async-errors')
const {MikroORM, RequestContext} = require('@mikro-orm/core')

const conf = require('./conf')
const log = require('./utils/log')
const middleware = require('./utils/middleware')
// export before circular dependency
const DI = {}
module.exports = {DI}
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')
const itemsRouter = require('./controllers/items')

const app = express()

const init = async () => {
  if (conf.SECRETS_HOST) {
    await conf.fetchSecrets()
  }

  // give static (corresponding files) priority over subsequent middleware for
  // GET; the path is relative to cwd
  app.use(express.static('../dist'))
  // deserialise json in requests into req.body
  app.use(express.json())

  if (conf.NODE_ENV === conf.NODE_ENV_DEV) {
    app.use(middleware.reqLogger)
  }

  // middleware mounted by app.<method>(...) is called (valid) only if requests
  // match the method and path (route) exactly (only with minor tolerance like
  // trailing slash), while app.use(...) results in prefix-based matching and
  // the matched prefix being stripped from req.url before passing it to
  // middleware
  // overridden by ../dist/index.html
  app.get('/', (req, res) => {
    res.send('<h1>Hello world!</h1>')
  })
  // for deployment or health check
  app.get('/version', (req, res) => {
    res.send('0')
  })

  DI.db = await MikroORM.init()
  DI.em = DI.db.em
  log.dev('the database is connected')
  // just before middleware using an em
  app.use((req, res, next) => {
    RequestContext.create(DI.em, next)
  })

  // prefix matching, meaning the route here should be excluded in routes to be
  // matched in the router (with its req.url)
  app.use(conf.LOGIN_EP, loginRouter)
  app.use(conf.USERS_EP, usersRouter)
  app.use(conf.ITEMS_EP, itemsRouter)

  app.use(middleware.unknownEp)
  app.use(middleware.errHandler)
}

module.exports.app = app
module.exports.init = init
