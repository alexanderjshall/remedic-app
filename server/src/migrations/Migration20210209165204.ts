import { Migration } from '@mikro-orm/migrations';

export class Migration20210209165204 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "consultation" add column "prescriptions" jsonb null;');
  }

}
