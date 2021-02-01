import { Migration } from '@mikro-orm/migrations';

export class Migration20210201170547 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "patient" add column "first_name" varchar(255) not null, add column "last_name" varchar(255) not null, add column "email" varchar(255) not null, add column "password" varchar(255) not null, add column "language" varchar(255) not null, add column "post_code" varchar(255) not null;');

    this.addSql('alter table "consultation" add column "pain_level" int4 not null, add column "patient_notes" varchar(255) not null, add column "transcript_translated" varchar(255) not null, add column "patient_rating" int4 not null, add column "doctor_notes_original" varchar(255) not null, add column "doctor_notes_translated" varchar(255) not null, add column "patient_id_id" int4 not null;');

    this.addSql('alter table "consultation" add constraint "consultation_patient_id_id_foreign" foreign key ("patient_id_id") references "patient" ("id") on update cascade;');
  }

}
