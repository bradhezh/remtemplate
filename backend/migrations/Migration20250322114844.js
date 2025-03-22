'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20250322114844 extends Migration {

  async up() {
    this.addSql(`create table \`base\` (\`id\` integer not null primary key autoincrement, \`created_at\` datetime not null, \`updated_at\` datetime not null);`);

    this.addSql(`create table \`user\` (\`id\` integer not null primary key autoincrement, \`created_at\` datetime not null, \`updated_at\` datetime not null, \`name\` text not null, \`password\` text not null default '');`);
    this.addSql(`create unique index \`user_name_unique\` on \`user\` (\`name\`);`);

    this.addSql(`create table \`item\` (\`id\` integer not null primary key autoincrement, \`created_at\` datetime not null, \`updated_at\` datetime not null, \`name\` text not null, \`user_id\` integer null, constraint \`item_user_id_foreign\` foreign key(\`user_id\`) references \`user\`(\`id\`) on delete set null on update cascade);`);
    this.addSql(`create unique index \`item_name_unique\` on \`item\` (\`name\`);`);
    this.addSql(`create index \`item_user_id_index\` on \`item\` (\`user_id\`);`);

    // initial data can't be auto generated, can be inserted here manually
    this.addSql(`insert into item (created_at, updated_at, name) values (strftime('%s', 'now'), strftime('%s', 'now'), 'item 1');`);
    this.addSql(`insert into item (created_at, updated_at, name) values (strftime('%s', 'now'), strftime('%s', 'now'), 'item 2');`);
  }

}
exports.Migration20250322114844 = Migration20250322114844;
