import 'reflect-metadata';
import { Entity, JsonType, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, InputType, Int, ObjectType } from 'type-graphql';
import Patient from './patient';
import Doctor from './doctor';


@ObjectType('Symptoms')
@InputType('inputSymptoms') 
export class Symptoms {
  @Field(() => String)
  area: string;

  @Field(() => [String])
  symptom: string[];
}

@ObjectType()
@Entity()
export default class Consultation {
  @Field(() => Int)
  @PrimaryKey()
  id: number;

  // Typegraphql uses ISO format by default.
  @Field(() => Date)
  @Property()
  consultationDate: Date;

  @Field(() => [Symptoms])
  @Property({type: JsonType})
  symptomsByArea: Symptoms[];

  @Field(() => Int)
  @Property()
  painLevel: number;

  @Field(() => String, {nullable:true})
  @Property({nullable:true})
  patientNotes?: string;

  @Field(() => String, {nullable: true})
  @Property({nullable:true})
  transcriptOriginal?: string;

  @Field(() => String, {nullable: true})
  @Property({nullable:true})
  transcriptTranslated?: string;

  @Field(() => Int, {nullable: true})
  @Property({nullable:true})
  patientRating?: number;

  @Field(() => String, {nullable: true})
  @Property({nullable:true})
  doctorNotesOriginal?: string;

  @Field(() => String,{nullable: true})
  @Property({nullable:true})
  doctorNotesTranslated?: string;

  @Field( () => Patient)
  @ManyToOne(() => Patient)
  patientId: Patient;

  @Field( () => Doctor)
  @ManyToOne(() => Doctor)
  doctorId: Doctor;
}