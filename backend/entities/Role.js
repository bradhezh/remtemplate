const {EntitySchema, Collection} = require('@mikro-orm/core')

const {Base} = require('./Base')

class Role extends Base {
  constructor(role) {
    super()
    this.name = role.name
    this.users = new Collection(this)
  }
}

const schema = new EntitySchema({
  class: Role, extends: 'Base',
  properties: {
    name: {type: 'string', unique: true},
    users: {kind: 'm:n', type: 'User', mappedBy: 'roles'},
  },
})

module.exports = {Role, schema}
