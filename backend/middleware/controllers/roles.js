const rolesRouter = require('express').Router()

const conf = require('../conf')
const Auth = require('../utils/auth')
const {DI} = require('../middleware')

// get all roles
//request: '/' {
//  // only for Admin
//  Authorization: Bearer token,
//}
//response: HTTP_SUCC [{
//  id: number/unique, name: string/unique,
//}]
rolesRouter.get('/', Auth({
  requiredRoles: [conf.AUTH_ADMIN_ROLE],
}), async (req, res) => {
  const roles = await DI.em.find(conf.ROLE_CLASS)

  res.json(roles)
})

module.exports = rolesRouter
