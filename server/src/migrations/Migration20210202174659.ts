import { Migration } from '@mikro-orm/migrations';

export class Migration20210202174659 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "consultation" add column "is_active" bool not null default true;');
  }

}
