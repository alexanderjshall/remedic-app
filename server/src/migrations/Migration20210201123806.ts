import { Migration } from '@mikro-orm/migrations';

export class Migration20210201123806 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "consultation" add column "symptoms_data" jsonb not null;');
  }

}
