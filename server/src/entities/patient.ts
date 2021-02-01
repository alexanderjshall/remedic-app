import { Entity, PrimaryKey } from '@mikro-orm/core';
import { ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export default class Patient {
  @PrimaryKey()
  id: number;
}