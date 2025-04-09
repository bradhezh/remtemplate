const {EntitySchema} = require('@mikro-orm/core')

class Base {
  constructor() {
  }
}

const schema = new EntitySchema({
  // "name" is specified for abstract entity classes as base classes but unable
  // to be instantiated
  name: 'Base',
  properties: {
    // values of the numeric primary key can be auto-generated from the db
    // (autoincrement), unless "autoincrement: false" is specified
    id: {primary: true, type: 'number'},
    /* mongo
    // the primary key for mongo, (can-be) auto-generated
    _id: {primary: true, type: 'ObjectId'},
    // a virtual property (no such a column in the table, auto-generated) as a
    // string representation of the primary key
    id: {serializedPrimaryKey: true, type: 'string'},
    */
    createdAt: {
      type: 'Date',
      lazy: true, hidden: true,
      // auto-generated
      onCreate: () => new Date(),
    },
    updatedAt: {
      type: 'Date',
      lazy: true, hidden: true,
      // auto-generated
      onCreate: () => new Date(), onUpdate: () => new Date(),
    },
  },
})

module.exports = {Base, schema}
