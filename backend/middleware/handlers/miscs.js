const path = require('path')

const conf = require('../conf')
const log = require('../utils/log')

// before requests are handled by controllers
const reqLogger = (req, res, next) => {
  log.debug(req.method, req.path, req.body)
  if (conf.NODE_ENV === conf.NODE_ENV_DEV) {
    log.debug(req.body)
  }
  next()
}

// the default handler
const unknownEp = (req, res) => {
  log.debug('unknown endpoint')
  if (conf.UNEP_SPA) {
    res.sendFile(path.join(process.cwd(), conf.UNEP_SPA))
  }
}

const errHandler = (err, req, res, next) => {
  log.error(`${err.name}: ${err.message}`)

  if (err.name === conf.ERR_NOT_FOUND) {
    res.status(conf.HTTP_NOT_FOUND).end()
    return
  }
  if (err.name === conf.ERR_UNIQUE) {
    res.status(conf.HTTP_BAD_REQ).json({message: conf.ERR_UNIQUE_MSG})
    return
  }
  if (err.name === conf.ERR_NULL) {
    res.status(conf.HTTP_BAD_REQ).json({message: conf.ERR_NULL_MSG})
    return
  }
  if (err.name === conf.ERR_VALID) {
    res.status(conf.HTTP_BAD_REQ).json({message: conf.ERR_VALID_MSG})
    return
  }
  if (err.name === conf.ERR_JWT) {
    res.status(conf.HTTP_UNAUTHED).json({message: conf.ERR_JWT_MSG})
    return
  }
  if (err.name === conf.ERR_JWT_EXPIRED) {
    res.status(conf.HTTP_UNAUTHED).json({message: conf.ERR_JWT_EXPIRED_MSG})
    return
  }
  if (err.name === conf.ERR_JWT_NBF) {
    res.status(conf.HTTP_UNAUTHED).json({message: conf.ERR_JWT_NBF_MSG})
    return
  }

  if (err.name === conf.ERR_LOG) {
    console.error(new Date(), ':', 'error:', err.message)
    res.status(conf.HTTP_INTERNAL).end()
    return
  }
  if (err.name === conf.ERR_MIDDLEWARE) {
    if (err.status === conf.HTTP_INTERNAL) {
      res.status(conf.HTTP_INTERNAL).end()
      return
    }
    res.status(err.status).json({message: err.message})
    return
  }

  next(err)
}

module.exports = {reqLogger, unknownEp, errHandler}
