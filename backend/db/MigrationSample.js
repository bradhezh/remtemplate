'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');
/* log
const { Migration } = require('@mikro-orm/migrations-mongodb');
*/
const bcrypt = require('bcrypt')

const conf = require('.../backend/conf')
const {AUTH_ADMIN_ROLE} = require('.../backend/middleware/conf')

class MigrationX extends Migration {

  async up() {
    await this.execute(`create table \`role\` (\`id\` integer not null primary key autoincrement, \`created_at\` datetime not null, \`updated_at\` datetime not null, \`name\` text not null);`);
    await this.execute(`create unique index \`role_name_unique\` on \`role\` (\`name\`);`);

    await this.execute(`create table \`user\` (\`id\` integer not null primary key autoincrement, \`created_at\` datetime not null, \`updated_at\` datetime not null, \`username\` text not null, \`name\` text not null, \`password\` text not null);`);
    await this.execute(`create unique index \`user_username_unique\` on \`user\` (\`username\`);`);

    await this.execute(`create table \`item\` (\`id\` integer not null primary key autoincrement, \`created_at\` datetime not null, \`updated_at\` datetime not null, \`name\` text not null, \`user_id\` integer null, constraint \`item_user_id_foreign\` foreign key(\`user_id\`) references \`user\`(\`id\`) on delete set null on update cascade);`);
    await this.execute(`create unique index \`item_name_unique\` on \`item\` (\`name\`);`);
    await this.execute(`create index \`item_user_id_index\` on \`item\` (\`user_id\`);`);

    await this.execute(`create table \`user_roles\` (\`user_id\` integer not null, \`role_id\` integer not null, constraint \`user_roles_user_id_foreign\` foreign key(\`user_id\`) references \`user\`(\`id\`) on delete cascade on update cascade, constraint \`user_roles_role_id_foreign\` foreign key(\`role_id\`) references \`role\`(\`id\`) on delete cascade on update cascade, primary key (\`user_id\`, \`role_id\`));`);
    await this.execute(`create index \`user_roles_user_id_index\` on \`user_roles\` (\`user_id\`);`);
    await this.execute(`create index \`user_roles_role_id_index\` on \`user_roles\` (\`role_id\`);`);

    // init data can't be auto generated, can be inserted here manually
    const roleid = await this.execute(
      `insert into role (created_at, updated_at, name)
      values (
        strftime('%s', 'now'), strftime('%s', 'now'),
        '${AUTH_ADMIN_ROLE}')
      returning id;`)
    const password = await bcrypt.hash(conf.ADMIN_INIT_PASSWORD, conf.SALT)
    const userid = await this.execute(
      `insert into user (
        created_at, updated_at, username, name, password, email)
      values (
        strftime('%s', 'now'), strftime('%s', 'now'),
        '${conf.ADMIN_INIT_USERNAME}', '', '${password}', '')
      returning id;`)
    this.execute(
      `insert into user_roles (user_id, role_id)
      values (${userid[0].id}, ${roleid[0].id});`)

    /* log
    const logs = this.getCollection('log')
    await logs.insertMany([{
      createdAt: new Date(), updatedAt: new Date(),
      type: 'info', message: 'init log',
    }])
    */
  }

}
exports.MigrationX = MigrationX;
