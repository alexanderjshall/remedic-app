import { Migration } from '@mikro-orm/migrations';

export class Migration20210201125637 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "consultation" drop column "transcript_translated";');
    this.addSql('alter table "consultation" drop column "doctor_notes_original";');
    this.addSql('alter table "consultation" drop column "doctor_notes_translated";');
    this.addSql('alter table "consultation" drop column "patient_rating";');
    this.addSql('alter table "consultation" drop constraint "consultation_patient_id_id_foreign";');
    this.addSql('alter table "consultation" drop column "patient_id_id";');
  }

}
