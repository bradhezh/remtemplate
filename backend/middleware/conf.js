module.exports = {
  HTTP_SUCC: 200,
  HTTP_CREATED: 201,
  HTTP_NO_CONT: 204,
  HTTP_BAD_REQ: 400,
  HTTP_UNAUTHED: 401,
  HTTP_NOT_FOUND: 404,
  HTTP_INTERNAL: 500,

  ERR_NOT_FOUND: 'NotFoundError',
  ERR_UNIQUE: 'UniqueConstraintViolationException',
  ERR_UNIQUE_MSG: 'Database UNIQUE constraint failed',
  ERR_NULL: 'NotNullConstraintViolationException',
  ERR_NULL_MSG: 'Database NOT NULL constraint failed',
  ERR_VALID: 'ValidationError',
  ERR_VALID_MSG: 'Database validation failed',
  ERR_JWT: 'JsonWebTokenError',
  ERR_JWT_MSG: 'JsonWebToken failed',
  ERR_JWT_EXPIRED: 'TokenExpiredError',
  ERR_JWT_EXPIRED_MSG: 'Token expired',
  ERR_JWT_NBF: 'NotBeforeError',
  ERR_JWT_NBF_MSG: 'Token not active yet',

  ERR_LOG: 'LogErr',
  ERR_MIDDLEWARE: 'MiddlewareErr',
  ERR_AUTH: 'Authorisation failed',
  ERR_LOGIN: 'Login failed',

  BY_ID: '/id/:id',
  BY_NAME: '/name/:name',
  BY_ROLE: '/role/:id',
  BY_SEARCH: '/search',
  BY_SIGNUP: '/signup',
  NODE_ENV_PRO: 'production',
  NODE_ENV_DBG: 'debug',
  NODE_ENV_DEV: 'development',
  NODE_ENV_TST: 'test',
  NODE_ENV: process.env.NODE_ENV,
  USER_CLASS: 'User',
  USER_USERNAME: 'username',
  USER_NAME: 'name',
  USER_PASSWORD: 'password',
  USER_ROLES: 'roles',
  ROLE_CLASS: 'Role',
  ROLE_NAME: 'name',
  ROLE_USERS: 'users',
  LOG_CLASS: 'Log',
  LOG_TYPE: 'type',
  LOG_MESSAGE: 'message',
  SALT: 10,
  TOKEN_EXPIRE: 86400,
  TOKEN_IN_COOKIE: false,
  PAGE_SIZE: 20,
  PAGE_SIZE_MAX: 100,
  UNEP_SPA: '../dist/index.html',
  AUTH_ADMIN_ROLE: 'Admin',
  AUTH_OWNER_ROLE: 'Owner',
}
