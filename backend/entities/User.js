const {EntitySchema, Collection/*, Cascade*/} = require('@mikro-orm/core')

const {Base} = require('./Base')

class User extends Base {
  constructor(user) {
    super()
    this.username = user.username
    this.name = user.name
    this.items = new Collection(this)
    this.roles = new Collection(this)
  }
}

const schema = new EntitySchema({
  class: User, extends: 'Base',
  properties: {
    username: {type: 'string', unique: true},
    name: {type: 'string'},
    password: {type: 'string', lazy: true, hidden: true},
    items: {
      kind: '1:m',
      type: 'Item',
      // the inverse side; meaning mapped by Item.user
      mappedBy: 'user',
      /* creation cascade by default
      cascade: [
        // creation cascade
        Cascade.PERSIST,
        // removal cascade; also enables the "on delete cascade" (can be
        // overridden by deleteRule) foreign key constraint if corresponding to
        // a foreign key column for relational databases
        Cascade.REMOVE,
      ],
      */
      /*
      orphanRemoval: true,
      */
    },
    roles: {kind: 'm:n', type: 'Role'},
  },
})

module.exports = {User, schema}
