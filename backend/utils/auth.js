const jwt = require('jsonwebtoken')

const conf = require('../conf')
const log = require('./log')
const {AppErr} = require('../utils/errors')
const {DI} = require('../app')
const {User} = require('../entities/User')

// an authorised request attaches the user as req.user, which remains in the
// same em throughout subsequent middleware as long as the async chain goes on;
// OWNER_ROLE means the user is required to be an owner of requested resources;
// for this, resources are supposed to be related to users, and a column value
// used to filter resources is supposed to be provided in the request via an
// param, or the request body provides a search with the mikro-accepted format;
// also, authorised resources will be attached as req.resources in the same way
//params:
//  requiredRoles: roles required
//  or: or/and on required roles
//  // only for OWNER_ROLE
//  resourceClass: the entity class of the resource
//  resourceFilter: the name of the column to filter resources, also as the
//    param name
//  resourceSearch: use the request body as search conditions
//  singleUser: relating a single user or a collection of them
//  resourceUser: the name of the related user property in the entity class;
//    default to 'user' when singleUser is true, 'users' if it's false
const Auth = ({
  requiredRoles, or = false,
  resourceClass, resourceFilter = 'id', resourceSearch = false,
  resourceUser, singleUser = true,
}) => {
  return async (req, res, next) => {
    log.dev('authorisation...')

    // get the user and roles
    const decoded = jwt.verify(
      req.get('authorization')?.replace('Bearer ', ''), conf.SECRET)
    const user = await DI.em.findOneOrFail(User, decoded.id, {
      populate: ['roles'],
    })
    req.user = user
    log.dev(`${user}`)

    // no role required or the user is admin
    if (!requiredRoles?.length) {
      log.dev('authorised: no role required')
      return next()
    }

    await authRoles({
      requiredRoles, or,
      resourceClass, resourceFilter, resourceSearch, search: req.body,
      user, resourceUser, singleUser,
    })
  }
}

const authRoles = async ({
  req,
  requiredRoles, or,
  resourceClass, resourceFilter, resourceSearch, search,
  user, resourceUser, singleUser,
}) => {
  for (const role of requiredRoles) {
    if (role !== conf.OWNER_ROLE) {
      const roleAuthed =
        user.roles.includes(role) || user.roles.includes(conf.ADMIN_ROLE)
      if (!or && !roleAuthed) {
        log.error(`unauthorised as ${role}`)
        throw new AppErr(conf.HTTP_UNAUTHED, conf.ERR_AUTH)
      }
      if (or && roleAuthed) {
        if (requiredRoles.includes(conf.OWNER_ROLE)) {
          req.resources = await getResources({
            resourceClass, resourceFilter, resourceSearch, search, resourceUser,
          })
        }
        log.dev(`authorised as ${role}`)
        return next()
      }
      continue
    }

    const [resourceAuthed, resources] = await authResources({
      resourceClass, resourceFilter, resourceSearch, search,
      user, resourceUser, singleUser,
    })
    if (!or && !resourceAuthed) {
      log.error('unauthorised as an owner')
      throw new AppErr(conf.HTTP_UNAUTHED, conf.ERR_AUTH)
    }
    req.resources = resources
    if (or && resourceAuthed) {
      log.dev('authorised as an owner')
      return next()
    }
    continue
  }

  if (or) {
    log.error('no role authorised')
    throw new AppErr(conf.HTTP_UNAUTHED, conf.ERR_AUTH)
  }
  log.dev('all roles authorised')
  next()
}

const authResources = async ({
  resourceClass, resourceFilter, resourceSearch, search,
  user, resourceUser, singleUser,
}) => {
  if (!resourceUser) {
    resourceUser = singleUser ? 'user' : 'users'
  }

  // get resources
  const resources = await getResources({
    resourceClass, resourceFilter, resourceSearch, search, resourceUser,
  })

  // authorise resources
  return [authRss({resources, user, resourceUser, singleUser}), resources]
}

const getResources = async ({
  resourceClass, resourceFilter, resourceSearch, search, resourceUser,
}) => {
  if (resourceSearch) {
    return await DI.em.find(resourceClass, search, {
      populate: [resourceUser],
    })
  }

  return await DI.em.find(resourceClass, {
    [resourceFilter]: req.params[resourceFilter],
  }, {
    populate: [resourceUser],
  })
}

const authRss = ({resources, user, resourceUser, singleUser}) => {
  for (const resource of resources) {
    if (
      singleUser && resource[resourceUser] !== user
      || !singleUser && !resource[resourceUser].includes(user)
    ) {
      return false
    }
    continue
  }
  return true
}

module.exports = Auth
