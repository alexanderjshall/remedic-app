import { Entity } from '@mikro-orm/core';
import { Query, Resolver } from 'type-graphql';

@Entity()
class Patient {

}

@Resolver(Patient)
export default class PatientResolver {
  @Query( () => String )
  hello (): string {
    console.log('in resolver');
    return 'hello';
  }
}