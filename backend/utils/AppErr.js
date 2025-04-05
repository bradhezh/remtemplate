const conf = require('../conf')

class AppErr extends Error {
  constructor(status, message) {
    super(message)
    this.name = conf.ERR_APP
    this.status = status
  }
}

module.exports = AppErr
