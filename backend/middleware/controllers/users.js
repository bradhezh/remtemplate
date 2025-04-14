const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')

const conf = require('../conf')
const log = require('../utils/log')
const {MiddlewareErr} = require('../utils/errors')
const Auth = require('../handlers/auth')
const {DI} = require('../middleware')

// get all users
//request: '/' {
//  // only for Admin
//  Authorization: Bearer token,
//}
//response: HTTP_SUCC [{
//  id: number/unique, username: string/unique, name: string,
//  roles: [{id: number/unique, name: string/unique}],
//}]
usersRouter.get('/', Auth({
  requiredRoles: [conf.AUTH_ADMIN_ROLE],
}), async (req, res) => {

  const users = await DI.em.find(conf.USER_CLASS, {}, {
    populate: [conf.USER_ROLES],
  })

  res.json(users)
})

// get users with a specified role
//request: '/role/:id' {
//  // only for Admin
//  Authorization: Bearer token,
//}
//response: HTTP_SUCC [{
//  id: number/unique, username: string/unique, name: string,
//}]
usersRouter.get(conf.BY_ROLE, Auth({
  requiredRoles: [conf.AUTH_ADMIN_ROLE],
}), async (req, res) => {

  const role = await DI.em.findOneOrFail(conf.ROLE_CLASS, req.params.id, {
    populate: [conf.ROLE_USERS],
  })

  res.json(role.users)
})

// get the user with a specified id
//request: '/id/:id' {
//  // only for Admin
//  Authorization: Bearer token,
//}
//response: HTTP_SUCC {
//  id: number/unique, username: string/unique, name: string,
//  roles: [{id: number/unique, name: string/unique}],
//}
usersRouter.get(conf.BY_ID, Auth({
  requiredRoles: [conf.AUTH_ADMIN_ROLE],
}), async (req, res) => {

  const user = await DI.em.findOneOrFail(conf.USER_CLASS, req.params.id, {
    populate: [conf.USER_ROLES],
  })

  res.json(user)
})

// get the user with a specified username
//request: '/name/:name' {
//  // only for Admin
//  Authorization: Bearer token,
//}
//response: HTTP_SUCC {
//  id: number/unique, username: string/unique, name: string,
//  roles: [{id: number/unique, name: string/unique}],
//}
usersRouter.get(conf.BY_NAME, Auth({
  requiredRoles: [conf.AUTH_ADMIN_ROLE],
}), async (req, res) => {

  const user = await DI.em.findOneOrFail(conf.USER_CLASS, {
    [conf.USER_USERNAME]: req.params.name,
  }, {
    populate: [conf.USER_ROLES],
  })

  res.json(user)
})

// restful search
//request: '/search' {
//  // only for Admin
//  Authorization: Bearer token,
//} {
//  // a mikro-accepted format search and
//  page: number, limit: 1~conf.PAGE_SIZE_MAX,
//}
//response: HTTP_SUCC [{
//  id: number/unique, username: string/unique, name: string,
//  roles: [{id: number/unique, name: string/unique}],
//}]
usersRouter.post(conf.BY_SEARCH, Auth({
  requiredRoles: [conf.AUTH_ADMIN_ROLE],
}), async (req, res) => {

  let {page = 1, limit = conf.PAGE_SIZE, ...where} = req.body
  if (limit < 1) {
    return res.json({})
  }
  if (limit > conf.PAGE_SIZE_MAX) {
    limit = conf.PAGE_SIZE
  }

  const [users, total] = await DI.em.findAndCount(conf.USER_CLASS, where, {
    populate: [conf.USER_ROLES],
    offset: (page - 1) * limit,
    limit,
  })

  res.json({users, total})
})

// sign up
//request: '/signup' {
//  username: string/unique, name: string, password: string,
//}
//response: HTTP_CREATED id:number/unique
usersRouter.post(conf.BY_SIGNUP, async (req, res) => {

  if (!DI.em) {
    log.error('middleware not initialised yet')
    throw new MiddlewareErr(conf.HTTP_INTERNAL)
  }

  req.body.password = await bcrypt.hash(req.body.password, conf.SALT)

  const user = DI.em.create(conf.USER_CLASS, {
    username: req.body.username, name: req.body.name,
    password: req.body.password,
  })
  await DI.em.flush()

  res.status(conf.HTTP_CREATED).json(user.id)
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
}), async (req, res) => {

  req.body.password = await bcrypt.hash(req.body.password, conf.SALT)

  const user = DI.em.create(conf.USER_CLASS, {
    username: req.body.username, name: req.body.name,
    password: req.body.password,
  })
  if (req.body.roles) {
    for (const id of req.body.roles) {
      const role = await DI.em.findOneOrFail(conf.ROLE_CLASS, id)
      user[conf.USER_ROLES].add(role)
    }
  }
  await DI.em.flush()

  res.status(conf.HTTP_CREATED).json(user.id)
})

// remove the request non-Admin user or users with specified ids for Admin
//request: '/' {
//  Authorization: Bearer token,
//} for Admin {
//  id: {
//    $in: [id: number/unique],
//  },
//}
//response: HTTP_SUCC count:number
usersRouter.delete('/', Auth({}), async (req, res) => {

  if (!req.user[conf.USER_ROLES].map(e => e[conf.ROLE_NAME])
    .includes(conf.AUTH_ADMIN_ROLE)) {
    DI.em.remove(req.user)
    await DI.em.flush()
    return res.status(conf.HTTP_SUCC).json(1)
  }

  const users = await DI.em.find(conf.USER_CLASS, req.body)
  for (const user of users) {
    DI.em.remove(user)
  }
  await DI.em.flush()

  res.status(conf.HTTP_SUCC).json(users.length)
})

// modify the request user
//request: '/' {
//  Authorization: Bearer token,
//} {
//  username: string/unique, name: string, password: string,
//}
//response: HTTP_NO_CONT
usersRouter.put('/', Auth({}), async (req, res) => {

  req.body.password = await bcrypt.hash(req.body.password, conf.SALT)

  req.user.username = req.body.username
  req.user.name = req.body.name
  req.user.password = req.body.password
  await DI.em.flush()

  res.status(conf.HTTP_NO_CONT).end()
})

// modify the user with a specified id
//request: '/id/:id' {
//  // only for Admin
//  Authorization: Bearer token,
//} {
//  username: string/unique, name: string, password: string,
//  roles: [id: number/unique]/nullable,
//}
//response: HTTP_NO_CONT
usersRouter.put(conf.BY_ID, Auth({
  requiredRoles: [conf.AUTH_ADMIN_ROLE],
}), async (req, res) => {

  const user = await DI.em.findOneOrFail(conf.USER_CLASS, req.params.id, {
    populate: !req.body.roles ? [] : [conf.USER_ROLES],
  })
  req.body.password = await bcrypt.hash(req.body.password, conf.SALT)

  user.username = req.body.username
  user.name = req.body.name
  user.password = req.body.password
  if (req.body.roles) {
    user[conf.USER_ROLES].removeAll()
    for (const id of req.body.roles) {
      const role = await DI.em.findOneOrFail(conf.ROLE_CLASS, id)
      user[conf.USER_ROLES].add(role)
    }
  }
  await DI.em.flush()

  res.status(conf.HTTP_NO_CONT).end()
})

module.exports = usersRouter
