// common configs used by both the frontend and backend

const conf = {
  LOGIN_EP: '/api/login',
  USERS_EP: '/api/users',
  ITEMS_EP: '/api/items',
  BY_ID: '/id/:id',
  BY_NAME: '/name/:name',
  BY_USERID: '/userid/:userid',
  BY_USERNAME: '/username/:username',
  BY_USER: '/user',
  BY_ADMIN: '/admin',
  BY_ID_ADMIN: '/id/:id/admin',

  PASSWD_MIN: 8,
  TOKEN_EXPIRE: 24 * 60 * 60,

  HTTP_SUCC: 200,
  HTTP_CREATED: 201,
  HTTP_NO_CONT: 204,
  HTTP_BAD_REQ: 400,
  HTTP_UNAUTHED: 401,
  HTTP_NOT_FOUND: 404,
}

module.exports = {
  ...conf,

  ERR_NOT_FOUND: 'NotFoundError',
  ERR_UNIQUE: 'UniqueConstraintViolationException',
  ERR_UNIQUE_MSG: 'Database UNIQUE constraint failed',
  ERR_NULL: 'NotNullConstraintViolationException',
  ERR_NULL_MSG: 'Database NOT NULL constraint failed',
  ERR_VALID: 'ValidationError',
  ERR_VALID_MSG: 'Database validation failed',

  ERR_APP: 'AppErr',
  ERR_USER_PASSWD: 'Username or password invalid',
  ERR_USER: 'User invalid',
  ERR_PASSWD: `Password must be at least ${conf.PASSWD_MIN} characters`,

  ERR_IV_USER_PASSWD: 'Please input the username and password',
  ERR_IV_USER_PASSWD_CONFIRM: 'Please input the username, password, and password confirmation',
  ERR_IV_PASSWD_CONFIRM: 'Please confirm your password',
}
