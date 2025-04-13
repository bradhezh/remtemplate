'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations-mongodb');

class Migration20250412013754 extends Migration {

  async up() {
    const logs = this.getCollection('log')
    await logs.insertMany([{
      createdAt: new Date(),
      updatedAt: new Date(),
      type: 'info',
      message: 'init log',
    }])
  }

}
exports.Migration20250412013754 = Migration20250412013754;
