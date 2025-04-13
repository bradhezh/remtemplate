const {EntitySchema} = require('@mikro-orm/core')

const baseProps = require('../../../middleware/entities/MongoBase')
const logProps = require('../../../middleware/entities/Log')

class Log {}

const schema = new EntitySchema({
  class: Log,
  properties: {
    ...baseProps,
    ...logProps,
  },
})

module.exports = {Log, schema}
