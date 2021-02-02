import { Migration } from '@mikro-orm/migrations';

export class Migration20210202090123 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "consultation" ("id" serial primary key, "consultation_date" timestamptz(0) not null, "symptoms_by_area" jsonb not null, "pain_level" int4 not null, "patient_notes" varchar(255) null, "transcript_original" varchar(255) null, "transcript_translated" varchar(255) null, "patient_rating" int4 null, "doctor_notes_original" varchar(255) null, "doctor_notes_translated" varchar(255) null, "patient_id_id" int4 not null);');

    this.addSql('alter table "consultation" add constraint "consultation_patient_id_id_foreign" foreign key ("patient_id_id") references "patient" ("id") on update cascade;');
  }

}
