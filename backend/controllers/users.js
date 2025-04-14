const usersRouter = require('express').Router()

const conf = require('../conf')
const {log, MiddlewareErr, Auth} = require('../middleware/middleware')

// sign up
//request: '/signup' {
//  username: string/unique, name: string, password: string,
//}
//response: HTTP_CREATED id:number/unique
usersRouter.post(conf.BY_SIGNUP, async (req, res, next) => {

  if (req.body.password.length < conf.PASSWORD_MIN) {
    log.error(`the password only has ${req.body.password.length} characters`)
    throw new MiddlewareErr(conf.HTTP_BAD_REQ, conf.ERR_USERS_PASSWORD)
  }
  next()
})

// create a user
//request: '/' {
//  // only for Admin
//  Authorization: Bearer token,
//} {
//  username: string/unique, name: string, password: string,
//  roles: [id: number/unique]/nullable,
//}
//response: HTTP_CREATED id:number/unique
usersRouter.post('/', Auth({
  requiredRoles: [conf.AUTH_ADMIN_ROLE],
}), async (req, res, next) => {

  if (req.body.password.length < conf.PASSWORD_MIN) {
    log.error(`the password only has ${req.body.password.length} characters`)
    throw new MiddlewareErr(conf.HTTP_BAD_REQ, conf.ERR_USERS_PASSWORD)
  }
  next()
})

module.exports = usersRouter
