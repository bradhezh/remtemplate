const conf = require('../conf')

const info = (...params) => {
  if (conf.NODE_ENV === conf.NODE_ENV_TST) {
    return
  }

  console.log(new Date(), ':', ...params)
}

const error = (...params) => {
  if (conf.NODE_ENV === conf.NODE_ENV_TST) {
    return
  }

  console.error(new Date(), ':', 'error:', ...params)
}

module.exports = {
  info,
  error,
}
