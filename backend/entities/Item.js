const {EntitySchema} = require('@mikro-orm/core')

const {Base} = require('./Base')

class Item extends Base {
  // constructors are never called for entities loaded from dbs
  constructor(item) {
    super()
    this.name = item.name
    this.user = item.user
  }
}

const schema = new EntitySchema({
  class: Item,
  /*
  tableName: 'items',
  */
  extends: 'Base',
  properties: {
    name: {
      type: 'string',
      /* matching TextType imported from @mikro-orm/core
      type: 'text',
      type: TextType,
      */
      /* t imported from @mikro-orm/core
      type: t.text,
      */
      /* varchar(1000)
      length: 1000,
      */
      /* or SQL
      columnType: 'character varying(1000)',
      columnType: 'decimal(10,2)',
      */
      unique: true,
      /*
      index: true,
      */
      /* the default value for the column rather than the property, which can
        therefore be auto-generated from the column if no value is specified, or
        remain invalid if being nullable
      default: '',
      */
      /*
      nullable: true,
      */
      /* excluded in queries by default; can be included via populating
        (em.populate(item, ['lazy_prop_name']))
      lazy: true,
      */
      /* hidden in serialisation (JSON)
      hidden: true,
      */
    },
    user: {
      kind: 'm:1',
      type: 'User',
      /* the owning side; as default; meaning inversed by User.items
      inversedBy: 'items',
      */
      /* the "on delete ..." or "on update ..." foreign key constraint for
        relational databases; no effect if not corresponding to a foreign key;
        to work in the expected "on delete cascade" way, removal cascade should
        be used on the other side as well; the expected "on delete restrict" way
        needs app code to work in the same way as well, otherwise it works in
        the "on delete set null" way due to propagation
      deleteRule: 'restrict',
      */
      nullable: true,
    },
  },
})

module.exports = {
  Item,
  schema,
}
