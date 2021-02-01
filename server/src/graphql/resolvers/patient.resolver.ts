import Patient from '../../entities/patient';
import { Query, Resolver } from 'type-graphql';


@Resolver(Patient)
export default class PatientResolver {
  @Query( () => String )
  hello (): string {
    console.log('in resolver');
    return 'hello';
  }
}