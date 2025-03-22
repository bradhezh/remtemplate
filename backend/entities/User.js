const {
  EntitySchema,
  Collection,
  Cascade,
} = require('@mikro-orm/core')

const {
  Base,
} = require('./Base')

class User extends Base {
  constructor(user) {
    super()
    this.name = user.name
    this.items = new Collection(this)
  }
}

const schema = new EntitySchema({
  class: User,
  extends: 'Base',
  properties: {
    name: {
      type: 'string',
      unique: true,
    },
    password: {
      type: 'string',
      lazy: true,
      hidden: true,
      default: '',
    },
    items: {
      kind: '1:m',
      type: 'Item',
      // the inverse side; meaning mapped by item.user
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
  },
})

module.exports = {
  User,
  schema,
}
