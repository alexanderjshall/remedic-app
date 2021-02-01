import Patient from '../../entities/patient';
import { Query, Resolver } from 'type-graphql';


@Resolver(Patient)
export default class PatientResolver {
  @Query( () => String )
  hello (): string {
    console.log('in resolver');
    return 'hello';
  }

  // 1. Mutation - create patient. Check email does not already exist. Returns a patient (w/o password) or null.


}