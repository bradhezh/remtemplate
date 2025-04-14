const conf = require('../conf')
const {LogErr} = require('../utils/errors')
const {DI} = require('../middleware')

const info = async (...params) => {

  if (conf.NODE_ENV === conf.NODE_ENV_TST) {
    return
  }
  console.log(new Date(), ':', ...params)

  if (conf.NODE_ENV !== conf.NODE_ENV_DBG) {
    return
  }
  if (!DI.getLogEm) {
    throw new LogErr('log not initialised yet')
  }
  const em = DI.getLogEm()
  em.create(conf.LOG_CLASS, {
    [conf.LOG_TYPE]: 'info',
    [conf.LOG_MESSAGE]: params.join(' '),
  })
  await em.flush()
}

const debug = async (...params) => {

  if (
    conf.NODE_ENV !== conf.NODE_ENV_DBG && conf.NODE_ENV !== conf.NODE_ENV_DEV
  ) {
    return
  }
  console.log(new Date(), ':', ...params)

  if (conf.NODE_ENV !== conf.NODE_ENV_DBG) {
    return
  }
  if (!DI.getLogEm) {
    throw new LogErr('log not initialised yet')
  }
  const em = DI.getLogEm()
  em.create(conf.LOG_CLASS, {
    [conf.LOG_TYPE]: 'debug',
    [conf.LOG_MESSAGE]: params.join(' '),
  })
  await em.flush()
}

const error = async (...params) => {

  console.error(new Date(), ':', 'error:', ...params)

  if (conf.NODE_ENV !== conf.NODE_ENV_DBG) {
    return
  }
  if (!DI.getLogEm) {
    throw new LogErr('log not initialised yet')
  }
  const em = DI.getLogEm()
  em.create(conf.LOG_CLASS, {
    [conf.LOG_TYPE]: 'error',
    [conf.LOG_MESSAGE]: params.join(' '),
  })
  await em.flush()
}

module.exports = {info, debug, error}
