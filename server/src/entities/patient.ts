import { Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, ObjectType } from 'type-graphql';
import Consultation from './consultation';

@ObjectType()
@Entity()
export default class Patient {

  @PrimaryKey()
  id: number;

  @Field(() => String)
  @Property()
  firstName: string;

  @Field(() => String)
  @Property()
  lastName: string;

  @Field(() => String)
  @Property()
  email: string;

  // No field decorator here as we don't want to expose the password.
  @Property()
  password: string;

  @Field(() => String)
  @Property()
  language: string;

  @Field(() => String)
  @Property()
  postCode: string;

  @Field(() => [Consultation])
  @OneToMany(() => Consultation, consultation => consultation.patientId)
  consultations: Consultation[];
}
