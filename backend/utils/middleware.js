const path = require('path')

const conf = require('../conf')
const log = require('./log')

// before requests are handled by controllers
const reqLogger = (req, res, next) => {
  log.info(`${req.ip}:`, req.method, req.path)
  if (conf.NODE_ENV === conf.NODE_ENV_DEV) {
    log.info(`${req.ip}:`, req.body)
  }

  // pass control to controllers
  next()
}

// the default handler
const unknownEp = (req, res) => {
  log.info(`${req.ip}:`, 'unknown endpoint')

  // in spa, site routes are handled by frontend, so for any unknown endpoint,
  // the page should be sent back for the frontend to handle the route
  res.sendFile(path.join(process.cwd(), '../dist/index.html'))
}

const errHandler = (err, req, res, next) => {
  log.error(`${req.ip}:`, `${err.name}: ${err.message}`)

  if (err.name === conf.ERR_NOT_FOUND) {
    res.status(conf.HTTP_NOT_FOUND).end()
    return
  }
  if (err.name === conf.ERR_UNIQUE) {
    // causing frontend axios to throw an "error" including the object (via
    // json) as error.response.data
    res.status(conf.HTTP_BAD_REQ).json({
      message: conf.ERR_UNIQUE_MSG,
    })
    return
  }
  if (err.name === conf.ERR_NULL) {
    res.status(conf.HTTP_BAD_REQ).json({
      message: conf.ERR_NULL_MSG,
    })
    return
  }
  if (err.name === conf.ERR_VALID) {
    res.status(conf.HTTP_BAD_REQ).json({
      message: conf.ERR_VALID_MSG,
    })
    return
  }

  if (err.name === conf.ERR_APP) {
    res.status(err.status).json({
      message: err.message,
    })
    return
  }

  // pass to the default one
  next(err)
}

module.exports = {
  reqLogger,
  unknownEp,
  errHandler,
}
