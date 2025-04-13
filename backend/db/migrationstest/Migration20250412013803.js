'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20250412013803 extends Migration {

  async up() {
    this.addSql(`create table \`role\` (\`id\` integer not null primary key autoincrement, \`created_at\` datetime not null, \`updated_at\` datetime not null, \`name\` text not null);`);
    this.addSql(`create unique index \`role_name_unique\` on \`role\` (\`name\`);`);

    this.addSql(`create table \`user\` (\`id\` integer not null primary key autoincrement, \`created_at\` datetime not null, \`updated_at\` datetime not null, \`username\` text not null, \`name\` text not null, \`password\` text not null, \`email\` text not null);`);
    this.addSql(`create unique index \`user_username_unique\` on \`user\` (\`username\`);`);

    this.addSql(`create table \`item\` (\`id\` integer not null primary key autoincrement, \`created_at\` datetime not null, \`updated_at\` datetime not null, \`name\` text not null, \`user_id\` integer null, constraint \`item_user_id_foreign\` foreign key(\`user_id\`) references \`user\`(\`id\`) on delete set null on update cascade);`);
    this.addSql(`create unique index \`item_name_unique\` on \`item\` (\`name\`);`);
    this.addSql(`create index \`item_user_id_index\` on \`item\` (\`user_id\`);`);

    this.addSql(`create table \`user_roles\` (\`user_id\` integer not null, \`role_id\` integer not null, constraint \`user_roles_user_id_foreign\` foreign key(\`user_id\`) references \`user\`(\`id\`) on delete cascade on update cascade, constraint \`user_roles_role_id_foreign\` foreign key(\`role_id\`) references \`role\`(\`id\`) on delete cascade on update cascade, primary key (\`user_id\`, \`role_id\`));`);
    this.addSql(`create index \`user_roles_user_id_index\` on \`user_roles\` (\`user_id\`);`);
    this.addSql(`create index \`user_roles_role_id_index\` on \`user_roles\` (\`role_id\`);`);
  }

}
exports.Migration20250412013803 = Migration20250412013803;
