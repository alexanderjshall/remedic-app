import { Migration } from '@mikro-orm/migrations';

export class Migration20210201101300 extends Migration {

  async up (): Promise<void> {
    this.addSql('create table "doctor" ("id" serial primary key, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "language" varchar(255) not null default \'en_GB\', "doc_public_code" varchar(255) not null default \'00000\');');

    this.addSql('create table "patient" ("id" serial primary key);');
  }

}
