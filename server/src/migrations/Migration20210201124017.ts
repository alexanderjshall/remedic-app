import { Migration } from '@mikro-orm/migrations';

export class Migration20210201124017 extends Migration {

  async up (): Promise<void> {
    this.addSql('alter table "patient" add column "first_name" varchar(255) not null, add column "last_name" varchar(255) not null, add column "email" varchar(255) not null, add column "password" varchar(255) not null, add column "language" varchar(255) not null, add column "post_code" int4 not null;');
  }

}
