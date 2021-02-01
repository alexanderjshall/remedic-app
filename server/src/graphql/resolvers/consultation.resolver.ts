import 'reflect-metadata';
import Patient from '../../entities/patient';
import { Mutation, Arg, Ctx, Field, InputType, Query, Resolver, Int, ID } from 'type-graphql';
import { CustomContext } from '..';
import Consultation, { Symptoms } from '../../entities/consultation';

@InputType() 
class ConsultationInput {
  @Field(() => Date)
  consultationDate: Date;

  // [{area, symptom}, {area,symptom}]
  @Field(() => [Symptoms])
  symptomsByArea: Symptoms[]; 

  @Field(() => Int)
  painLevel: number;

  @Field(() => String, {nullable: true})
  patientNotes?: string;

  @Field( () => ID)
  patientId: Patient;
}



//3. Mutation - update a consultation via id. Should be able to update any field. 

@Resolver(Consultation)
export default class ConsultationResolver {
  @Query(() => Consultation)
  async getOneConsulation (
    @Arg('id') id:number,
    @Ctx() {consultationRepo}: CustomContext
  ): Promise<Consultation|null> {
    try {
      const consultation = await consultationRepo.findOne(id);
      if (!consultation) throw new Error (`Consultation with id ${id} not found`);
      return consultation;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  // 2. Query - get consultations of a specific patient. Returns an array of consultations.
  
  // 1. Mutation - add a consultation.
  @Mutation (() => Consultation)
  async addConsultation (
    @Arg('input') newConsult: ConsultationInput,
    @Ctx() {consultationRepo}: CustomContext
  ): Promise<Consultation|null> {
    try {
      const consultation = consultationRepo.create(newConsult);
      await consultationRepo.persistAndFlush(consultation);
      return consultation;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

}