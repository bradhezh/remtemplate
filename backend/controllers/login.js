const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const conf = require('../conf')
const AppErr = require('../utils/AppErr')
const {DI} = require('../app')
const {User} = require('../entities/User')

// login
//request: '/api/login' {
//  username: string/unique,
//  password: string/conf.PASSWD_MIN+,
//}
//response: HTTP_SUCC {
//  name: string,
//  token: string,
//}
loginRouter.post('/', async (req, res) => {
  const user = await DI.em.findOne(User, {
    username: req.body.username,
  }, {
    populate: [
      'password',
    ],
  })
  const verified =
    user && await bcrypt.compare(req.body.password, user.password)
  if (!verified) {
    throw new AppErr(conf.HTTP_UNAUTHED, conf.ERR_USER_PASSWD)
  }

  // a token signed with a secret; only those who have the secret can generate a
  // valid token
  const token = jwt.sign({
    id: user.id,
  }, conf.SECRET, {
    expiresIn: conf.TOKEN_EXPIRE,
  })

  res.json({
    name: user.name,
    token,
  })
})

module.exports = loginRouter
