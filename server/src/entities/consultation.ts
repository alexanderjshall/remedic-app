import 'reflect-metadata';
import { ArrayType, Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, InputType, Int, ObjectType } from 'type-graphql';


@ObjectType('Symptoms')
@InputType('inputSymptoms') 
export class Symptoms {
  @Field(() => String)
  area: string;

  @Field(() => [String])
  symptom: string[];

}

// export const SymptomsScalar = new GraphQLScalarType({
//   name: 'Symptoms',
//   description: 'GQL custom scalar for the the symptomsData field on Consultation.',
  
//   parseValue (value: Symptoms) {
//     console.log('parseV', value);
//     return value;
//   },
//   serialize (value: Symptoms) {
//     console.log('serialize', value);
//     return value;
//   },
//   parseLiteral (ast) {
//     console.log('ast',ast);
//     return ast;
//   }
// });


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

  @Field(() => String)
  @Property()
  transcriptOriginal: string;

  // @Field(() => String, {nullable:true})
  // @Property()
  // patientNotes: string;

  // @Field(() => Int)
  // @Property()
  // painLevel: number;

  @Field(() => [Symptoms])
  @Property({ type: ArrayType})
  symptomsByArea: Symptoms[];


  // @Field(() => String)
  // @Property()
  // transcriptTranslated: string;

  // @Field(() => String)
  // @Property()
  // doctorNotesOriginal: string;

  // @Field(() => String)
  // @Property()
  // doctorNotesTranslated: string;

  // @Field(() => Int)
  // @Property()
  // patientRating: number;

  // @Field( () => ID)
  // @ManyToOne(() => Patient)
  // patientId: Patient;

}

// consultation: {
//// _consultation_id: id;
////   date: DateTime;
////   transcript-original: string;
////   transcript-translated: string;
//   doctorID: doctor._id;
////   patientID: patient._id;
////   doctorNotes-original: string;
// ////   doctorNotes-translated: string;
// painLevel: number;
// patientNotes: string;
// symptomsByArea: [{
//   area: string;
//   symptom: string; 'headache, temp'
//  }];
    
//   };
////   patientRating: number;
// }