'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations-mongodb');

class Migration20250325065613 extends Migration {

  async up() {
    const items = this.getCollection('item')
    await items.insertMany([{
      name: 'item 1',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'item 2',
      createdAt: new Date(),
      updatedAt: new Date(),
    }])
  }

}
exports.Migration20250325065613 = Migration20250325065613;
