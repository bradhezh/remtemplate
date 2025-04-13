const jwt = require('jsonwebtoken')

const conf = require('../conf')
const log = require('../utils/log')
const {MiddlewareErr} = require('../utils/errors')
const {DI} = require('../middleware')

// AUTH_OWNER_ROLE means the user is required to be an owner of requested
// resources; for this, resources are supposed to be related to users, and a
// column value used to filter resources is supposed to be provided in the
// request via an param, or the request body should provide a search with the
// mikro-accepted format; the authorised user will be attached as req.user; if
// AUTH_OWNER_ROLE is included in any case (and/or), authorised resources will
// be attached as req.resources; they both remain in the em of the request
// context throughout subsequent middleware as long as the async chain goes on
//params:
//  requiredRoles: roles required
//  or: or/and on required roles
//  // only for AUTH_OWNER_ROLE
//  rscClass: the resource entity class name
//  rscFilter: the resource filter column name, also as the param name
//  rscSearch: using the request body as search conditions
//  rscUser: the related user property name in the resource class; default to
//    'user'/'users' if rscUserSingle is true/false
//  rscUserSingle: related to a single user or a collection of them
const Auth = ({
  requiredRoles, or = false,
  rscClass, rscFilter = 'id', rscSearch = false, rscUser, rscUserSingle = true,
}) => {
  return async (req, res, next) => {
    if (!DI.jwtSecret || !DI.em) {
      log.error('authorisation not initialised yet')
      throw new MiddlewareErr(conf.HTTP_UNAUTHED, conf.ERR_AUTH)
    }
    log.debug('authorisation...')

    await getUser({req})

    // no role required
    if (!requiredRoles?.length) {
      log.debug('authorised: no role required')
      return next()
    }

    const userRoles = req.user[conf.USER_ROLES].map(e => e[conf.ROLE_NAME])
    if (userRoles.includes(conf.AUTH_ADMIN_ROLE)) {
      log.debug(`authorised for ${conf.AUTH_ADMIN_ROLE}`)
    } else {
      await authRoles({
        userRoles, requiredRoles, or,
        rscClass, rscFilter, rscSearch, rscUser, rscUserSingle, req,
      })
    }
    // attach resources as long as "Owner" is required (whenever and/or)
    if (requiredRoles.includes(conf.AUTH_OWNER_ROLE) && !req.resources) {
      await getRscs({rscClass, rscFilter, rscSearch, req})
    }
    return next()
  }
}

const getUser = async ({req}) => {
  let token
  if (!conf.TOKEN_IN_COOKIE) {
    token = req.get('authorization')?.replace('Bearer ', '')
  } else {
    /* get the token from the cookie
    token =
    */
    log.error('cookie-based authentication not implemented yet')
    throw new MiddlewareErr(conf.HTTP_UNAUTHED, conf.ERR_AUTH)
  }

  const id = jwt.verify(token, DI.jwtSecret).id
  let userId
  if (!conf.TOKEN_IN_COOKIE) {
    userId = id
  } else {
    /* id is a session id, so get the user id from the session
    userId =
    */
    log.error('cookie-based authentication not implemented yet')
    throw new MiddlewareErr(conf.HTTP_UNAUTHED, conf.ERR_AUTH)
  }

  const user = await DI.em.findOneOrFail(conf.USER_CLASS, userId, {
    populate: [conf.USER_ROLES],
  })
  log.debug(
    user[conf.USER_USERNAME],
    user[conf.USER_ROLES].map(e => e[conf.ROLE_NAME]))
  req.user = user
}

const authRoles = async ({
  userRoles, requiredRoles, or,
  rscClass, rscFilter, rscSearch, rscUser, rscUserSingle, req,
}) => {
  for (const role of requiredRoles) {
    if (role !== conf.AUTH_OWNER_ROLE) {
      const roleAuthed = userRoles.includes(role)
      if (!or && !roleAuthed) {
        log.error(`unauthorised as ${role}`)
        throw new MiddlewareErr(conf.HTTP_UNAUTHED, conf.ERR_AUTH)
      }
      if (or && roleAuthed) {
        log.debug(`authorised for ${role}`)
        return
      }
      continue
    }

    const rscsAuthed = await authRscs({
      rscClass, rscFilter, rscSearch, rscUser, rscUserSingle, req,
    })
    if (!or && !rscsAuthed) {
      log.error('unauthorised as an owner')
      throw new MiddlewareErr(conf.HTTP_UNAUTHED, conf.ERR_AUTH)
    }
    if (or && rscsAuthed) {
      log.debug('authorised for an owner')
      return
    }
    continue
  }

  if (or) {
    log.error('no role authorised')
    throw new MiddlewareErr(conf.HTTP_UNAUTHED, conf.ERR_AUTH)
  }
  log.debug('all roles authorised')
  return
}

const authRscs = async ({
  rscClass, rscFilter, rscSearch, rscUser, rscUserSingle, req,
}) => {
  if (!rscUser) {
    rscUser = rscUserSingle ? 'user' : 'users'
  }

  await getRscs({rscClass, rscFilter, rscSearch, rscUser, req})

  for (const resource of req.resources) {
    if (
      rscUserSingle && resource[rscUser] !== user
      || !rscUserSingle && !resource[rscUser].includes(user)
    ) {
      return false
    }
    continue
  }
  return true
}

const getRscs = async ({rscClass, rscFilter, rscSearch, rscUser, req}) => {
  if (rscSearch) {
    req.resource = await DI.em.find(rscClass, req.body, {
      populate: !rscUser ? [] : [rscUser],
    })
    return
  }

  req.resource = await DI.em.find(rscClass, {
    [rscFilter]: req.params[rscFilter]
  }, {
    populate: !rscUser ? [] : [rscUser],
  })
}

module.exports = Auth
