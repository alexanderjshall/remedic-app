import { Migration } from '@mikro-orm/migrations';

export class Migration20210202100550 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "doctor" ("id" serial primary key, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "language" varchar(255) not null default \'en_GB\', "doc_public_code" varchar(255) not null default \'00000\');');

    this.addSql('create table "patient" ("id" serial primary key, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "language" varchar(255) not null, "post_code" varchar(255) not null);');

    this.addSql('create table "consultation" ("id" serial primary key, "consultation_date" timestamptz(0) not null, "symptoms_by_area" jsonb not null, "pain_level" int4 not null, "patient_notes" varchar(255) null, "transcript_original" varchar(255) null, "transcript_translated" varchar(255) null, "patient_rating" int4 null, "doctor_notes_original" varchar(255) null, "doctor_notes_translated" varchar(255) null, "patient_id_id" int4 not null, "doctor_id_id" int4 not null);');

    this.addSql('alter table "consultation" add constraint "consultation_patient_id_id_foreign" foreign key ("patient_id_id") references "patient" ("id") on update cascade;');
    this.addSql('alter table "consultation" add constraint "consultation_doctor_id_id_foreign" foreign key ("doctor_id_id") references "doctor" ("id") on update cascade;');
  }

}
