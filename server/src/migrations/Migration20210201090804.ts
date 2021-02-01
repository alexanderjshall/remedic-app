import { Migration } from '@mikro-orm/migrations';

export class Migration20210201090804 extends Migration {

  async up (): Promise<void> {
    this.addSql('create table "patient" ("id" serial primary key);');
  }

}
