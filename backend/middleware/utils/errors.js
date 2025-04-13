const conf = require('../conf')

class MiddlewareErr extends Error {
  constructor(status, message) {
    super(message)
    this.name = conf.ERR_MIDDLEWARE
    this.status = status
  }
}

class LogErr extends Error {
  constructor(message) {
    super(message)
    this.name = conf.ERR_LOG
  }
}

module.exports = {MiddlewareErr, LogErr}
