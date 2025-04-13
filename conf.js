// common configs used by both the frontend and backend

module.exports = {
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

  ERR_IV_USER_PASSWD: 'Please input the username and password',
  ERR_IV_USER_PASSWD_CONFIRM: 'Please input the username, password, and password confirmation',
  ERR_IV_PASSWD_CONFIRM: 'Please confirm your password',

  PASSWD_MIN: 8,
}
