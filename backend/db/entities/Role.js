const {EntitySchema} = require('@mikro-orm/core')

const baseProps = require('../../middleware/entities/Base')
const roleProps = require('../../middleware/entities/Role')

class Role {}

const schema = new EntitySchema({
  class: Role,
  properties: {
    ...baseProps,
    ...roleProps,
  },
})

module.exports = {Role, schema}
