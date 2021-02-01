import { Migration } from '@mikro-orm/migrations';

export class Migration20210201113153 extends Migration {

  async up (): Promise<void> {
    this.addSql('create table "consultation" ("id" serial primary key, "consultation_date" timestamptz(0) not null, "transcript_original" varchar(255) not null, "transcript_translated" varchar(255) not null, "doctor_notes_original" varchar(255) not null, "doctor_notes_translated" varchar(255) not null, "patient_rating" int4 not null, "patient_id_id" int4 not null);');

    this.addSql('alter table "consultation" add constraint "consultation_patient_id_id_foreign" foreign key ("patient_id_id") references "patient" ("id") on update cascade;');
  }

}
