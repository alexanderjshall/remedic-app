import { Migration } from '@mikro-orm/migrations';

export class Migration20210204113948 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "doctor" drop constraint if exists "doctor_language_check";');
    this.addSql('alter table "doctor" alter column "language" type varchar(255) using ("language"::varchar(255));');
    this.addSql('alter table "doctor" alter column "language" set default \'en\';');
  }

}
