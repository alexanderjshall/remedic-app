import { Migration } from '@mikro-orm/migrations';

export class Migration20210201154913 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "consultation" add column "symptoms_by_area" text[] not null;');
    this.addSql('alter table "consultation" drop column "symptoms_data";');
  }

}
