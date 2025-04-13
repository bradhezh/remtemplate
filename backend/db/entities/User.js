const {EntitySchema} = require('@mikro-orm/core')

const baseProps = require('../../middleware/entities/Base')
const userProps = require('../../middleware/entities/User')

class User {}

const schema = new EntitySchema({
  class: User,
  properties: {
    ...baseProps,
    ...userProps,
    email: {type: 'string'},
    items: {kind: '1:m', type: 'Item', mappedBy: 'user'},
  },
})

module.exports = {User, schema}
