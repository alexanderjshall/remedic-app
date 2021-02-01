import 'reflect-metadata';
import { ArrayType, Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, ID, InputType, Int, ObjectType } from 'type-graphql';
import Patient from './patient';


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

  // Typegraphql uses ISO format by default. Can change this in the buildSchema option.
  @Field(() => Date)
  @Property()
  consultationDate: Date;

  @Field(() => [Symptoms])
  @Property({ type: ArrayType})
  symptomsByArea: Symptoms[];

  @Field(() => Int)
  @Property()
  painLevel: number;

  @Field(() => String, {nullable:true})
  @Property()
  patientNotes?: string;

  @Field(() => String, {nullable: true})
  @Property()
  transcriptOriginal?: string;

  @Field(() => String, {nullable: true})
  @Property()
  transcriptTranslated?: string;

  @Field(() => Int, {nullable: true})
  @Property()
  patientRating?: number;

  @Field(() => String, {nullable: true})
  @Property()
  doctorNotesOriginal?: string;

  @Field(() => String,{nullable: true})
  @Property()
  doctorNotesTranslated?: string;

  @Field( () => ID)
  @ManyToOne(() => Patient)
  patientId: Patient;

}