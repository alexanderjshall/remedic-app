import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, ID, Int, ObjectType } from 'type-graphql';
import Patient from './patient';


// type Symptoms = {
//   painLevel: number;
//   patientNotes: string;
//   // symptomsByArea: []
// }


@ObjectType()
@Entity()
export default class Consultation {
  @Field(() => Int)
  @PrimaryKey()
  id: number;

  @Field(() => Date)
  @Property()
  consultationDate: Date;

  @Field(() => String)
  @Property()
  transcriptOriginal: string;

  @Field(() => String)
  @Property()
  transcriptTranslated: string;

  @Field(() => String)
  @Property()
  doctorNotesOriginal: string;

  @Field(() => String)
  @Property()
  doctorNotesTranslated: string;

  @Field(() => Int)
  @Property()
  patientRating: number;

  @Field( () => ID)
  @ManyToOne(() => Patient)
  patientId: Patient;

  // @Field(() => Symptoms)
  // @Property()
  // symptomsData: Symptoms;
}

// consultation: {
//// _consultation_id: id;
////   date: DateTime;
////   transcript-original: string;
////   transcript-translated: string;
//   doctorID: doctor._id;
////   patientID: patient._id;
////   doctorNotes-original: string;
////   doctorNotes-translated: string;
//   symptomsData: {
//     painLevel: number;
//     symptomsByArea: [
//       {
//         area: string;
//         symptom: string;
//       }
//     ];
//     patientNotes: string;
//   };
////   patientRating: number;
// }