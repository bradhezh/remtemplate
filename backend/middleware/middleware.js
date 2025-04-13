const conf = require('./conf')

const DI = {}
module.exports = {DI}
const log = require('./utils/log')
const reqLogger = require('./handlers/miscs')
const unknownEp = require('./handlers/miscs')
const errHandler = require('./handlers/miscs')
const Auth = require('./handlers/auth')
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')
const rolesRouter = require('./controllers/roles')

//param: {
//  em,
//  getLogEm,
//  jwtSecret,
//}
const init = (param) => {
  Object.assign(DI, param)
}

//param: {
//  BY_ID: '/id/:id',
//  BY_NAME: '/name/:name',
//  BY_ROLE: '/role/:id',
//  BY_SEARCH: '/search',
//  BY_SIGNUP: '/signup',
//  NODE_ENV_PRO: 'production',
//  NODE_ENV_DBG: 'debug',
//  NODE_ENV_DEV: 'development',
//  NODE_ENV_TST: 'test',
//  NODE_ENV: process.env.NODE_ENV,
//  USER_CLASS: 'User',
//  USER_USERNAME: 'username',
//  USER_NAME: 'name',
//  USER_PASSWORD: 'password',
//  USER_ROLES: 'roles',
//  ROLE_CLASS: 'Role',
//  ROLE_NAME: 'name',
//  ROLE_USERS: 'users',
//  LOG_CLASS: 'Log',
//  LOG_TYPE: 'type',
//  LOG_MESSAGE: 'message',
//  SALT: 10,
//  TOKEN_EXPIRE: 86400,
//  TOKEN_IN_COOKIE: false,
//  PAGE_SIZE: 20,
//  PAGE_SIZE_MAX: 100,
//  UNEP_SPA: '../dist/index.html',
//  AUTH_ADMIN_ROLE: 'Admin',
//  AUTH_OWNER_ROLE: 'Owner',
//}
const config = (param) => {
  Object.assign(conf, param)
}

module.exports = {
  init, config,
  log,
  reqLogger, unknownEp, errHandler, Auth,
  loginRouter, usersRouter, rolesRouter,
}
