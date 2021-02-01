import 'reflect-metadata';
import { Mutation, Arg, Ctx, Field, InputType, Query, Resolver } from 'type-graphql';
import { CustomContext } from '..';
import Consultation, { Symptoms } from '../../entities/consultation';

@InputType() 
class ConsultationInput {
  @Field(() => Date)
  consultationDate: Date;

  @Field(() => String)
  transcriptOriginal: string;

  // update to an array of symptoms
  @Field(() => [Symptoms])
  symptomsByArea: Symptoms[]; // [{area, symptom}, {area,symptom}]

}

@Resolver(Consultation)
export default class ConsultationResolver {
  @Query(() => Consultation)
  async getOneConsulation (
    @Arg('id') id:number,
    @Ctx() {consultationRepo}: CustomContext
  ): Promise<Consultation|null> {
    try {
      const consultation = await consultationRepo.findOne(id);  
      console.log(consultation);
      return consultation;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  @Mutation (() => Consultation)
  async addConsultation (
    @Arg('input') newConsult: ConsultationInput,
    @Ctx() {consultationRepo}: CustomContext
  ): Promise<Consultation|null> {
    try {
      const consultation = consultationRepo.create(newConsult);
      console.log('after create', consultation);
      await consultationRepo.persistAndFlush(consultation);
      return consultation;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

}