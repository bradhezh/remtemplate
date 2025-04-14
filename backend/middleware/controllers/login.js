const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const conf = require('../conf')
const log = require('../utils/log')
const {MiddlewareErr} = require('../utils/errors')
const {DI} = require('../middleware')

// login
//request: '/' {
//  username: string/unique, password: string,
//}
//response: HTTP_SUCC {
//  name: string, token: string,
//}
loginRouter.post('/', async (req, res) => {

  if (!DI.em || !DI.jwtSecret) {
    log.error('middleware not initialised yet')
    throw new MiddlewareErr(conf.HTTP_INTERNAL)
  }

  const user = await DI.em.findOne(conf.USER_CLASS, {
    [conf.USER_USERNAME]: req.body.username,
  }, {
    populate: [conf.USER_PASSWORD],
  })
  const verified =
    user && await bcrypt.compare(req.body.password, user[conf.USER_PASSWORD])
  if (!verified) {
    log.error(`${req.body.username}: username or password invalid`)
    throw new MiddlewareErr(conf.HTTP_UNAUTHED, conf.ERR_LOGIN)
  }

  const token = jwt.sign({id: user.id}, DI.jwtSecret, {
    expiresIn: conf.TOKEN_EXPIRE,
  })

  res.json({name: user.name, token})
})

module.exports = loginRouter
