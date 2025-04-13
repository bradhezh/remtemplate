const {EntitySchema} = require('@mikro-orm/core')

const baseProps = require('../../middleware/entities/Base')

class Item {}

const schema = new EntitySchema({
  class: Item,
  properties: {
    ...baseProps,
    name: {type: 'string', unique: true},
    user: {kind: 'm:1', type: 'User', nullable: true},
  },
})

module.exports = {Item, schema}
