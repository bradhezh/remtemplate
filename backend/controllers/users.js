const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')

const conf = require('../conf')
const {AppErr} = require('../utils/errors')
const Auth = require('../utils/auth')
const {DI} = require('../app')
const {User} = require('../entities/User')

// get all users
//request: '/api/users' {
//  // only for Admin
//  Authorization: Bearer token,
//}
//response: HTTP_SUCC [{
//  id: number/unique,
//  username: string/unique,
//  name: string,
//}]
usersRouter.get('/', Auth({
  requiredRoles: [conf.ADMIN_ROLE],
}), async (req, res) => {
  const users = await DI.em.find(User)

  res.json(users)
})

// get the user with a specified username
//request: '/api/users/name/:name' {
//  // only for Admin
//  Authorization: Bearer token,
//}
//response: HTTP_SUCC {
//  id: number/unique,
//  username: string/unique,
//  name: string,
//}
usersRouter.get(conf.BY_NAME, Auth({
  requiredRoles: [conf.ADMIN_ROLE],
}), async (req, res) => {
  const user = await DI.em.findOneOrFail(User, {username: req.params.name})

  res.json(user)
})

// create a user
//request: '/api/users' {
//  username: string/unique,
//  name: string,
//  password: string/conf.PASSWD_MIN+,
//}
//response: HTTP_CREATED id:number/unique
usersRouter.post('/', async (req, res) => {
  if (req.body.password.length < conf.PASSWD_MIN) {
    throw new AppErr(conf.HTTP_BAD_REQ, conf.ERR_PASSWD)
  }
  req.body.password = await bcrypt.hash(req.body.password, conf.SALT)

  const user = DI.em.create(User, req.body)
  await DI.em.flush()

  res.status(conf.HTTP_CREATED).json(user.id)
})

// remove users with specified ids
//request: '/api/users' {
//  // only for Admin
//  Authorization: Bearer token,
//} {
//  id: {
//    $in: [
//      id: number/unique,
//    ],
//  },
//}
//response: HTTP_SUCC count:number
usersRouter.delete('/', Auth({
  requiredRoles: [conf.ADMIN_ROLE],
}), async (req, res) => {
  const users = await DI.em.find(User, req.body)
  for (const user of users) {
    DI.em.remove(user)
  }
  await DI.em.flush()

  res.status(conf.HTTP_SUCC).json(users.length)
})

// modify the request user
//request: '/api/users' {
//  Authorization: Bearer token,
//} {
//  username: string/unique,
//  name: string,
//  password: string/conf.PASSWD_MIN+,
//}
//response: HTTP_NO_CONT
usersRouter.put('/', Auth({}), async (req, res) => {
  if (req.body.password.length < conf.PASSWD_MIN) {
    throw new AppErr(conf.HTTP_BAD_REQ, conf.ERR_PASSWD)
  }
  req.body.password = await bcrypt.hash(req.body.password, conf.SALT)

  Object.assign(req.user, req.body)
  await DI.em.flush()

  res.status(conf.HTTP_NO_CONT).end()
})

module.exports = usersRouter
