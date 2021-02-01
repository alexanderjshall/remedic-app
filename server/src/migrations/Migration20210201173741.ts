import { Migration } from '@mikro-orm/migrations';

export class Migration20210201173741 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "patient" ("id" serial primary key, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "language" varchar(255) not null, "post_code" varchar(255) not null);');

    this.addSql('alter table "consultation" add column "pain_level" int4 not null, add column "patient_notes" varchar(255) not null, add column "transcript_translated" varchar(255) not null, add column "patient_rating" int4 not null, add column "doctor_notes_original" varchar(255) not null, add column "doctor_notes_translated" varchar(255) not null, add column "patient_id_id" int4 not null;');

    this.addSql('alter table "consultation" add constraint "consultation_patient_id_id_foreign" foreign key ("patient_id_id") references "patient" ("id") on update cascade;');
  }

}
