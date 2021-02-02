import 'reflect-metadata';
import Patient from '../../entities/patient';
import { Mutation, Arg, Ctx, Field, InputType, Query, Resolver, Int, ID, FieldResolver, Root } from 'type-graphql';
import { CustomContext } from '..';
import Consultation, { Symptoms } from '../../entities/consultation';
import { wrap } from '@mikro-orm/core';

@InputType() 
class ConsultationInput {
  @Field(() => Date)
  consultationDate: Date;

  // [{area, symptom}, {area,symptom}]
  @Field(() => [Symptoms])
  symptomsByArea: Symptoms[]; 

  @Field(() => ID)
  painLevel: number;

  @Field(() => String, {nullable: true})
  patientNotes?: string;

  @Field( () => Int)
  patientId: number;
}

@InputType()
class UpdateConsultationInput {
  @Field(() => Date, {nullable:true})
  consultationDate?: Date;

  @Field(() => [Symptoms], {nullable:true})
  symptomsByArea?: Symptoms[];

  @Field(() => Int, {nullable:true})
  painLevel?: number;

  @Field(() => String, {nullable:true})
  patientNotes?: string;

  @Field(() => String, {nullable: true})
  transcriptOriginal?: string;

  @Field(() => String, {nullable: true})
  transcriptTranslated?: string;

  @Field(() => Int, {nullable: true})
  patientRating?: number;

  @Field(() => String, {nullable: true})
  doctorNotesOriginal?: string;

  @Field(() => String,{nullable: true})
  doctorNotesTranslated?: string;
}



@Resolver(Consultation)
export default class ConsultationResolver {
  @Query(() => Consultation)
  async getOneConsulation (
    @Arg('id') id:number,
    @Ctx() {consultationRepo}: CustomContext
  ): Promise<Consultation|null> {
    try {
      const consultation = await consultationRepo.findOne({id});
      if (!consultation) throw new Error (`Consultation with id ${id} not found`);
      return consultation;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  // 2. Query - get consultations of a specific patient. Returns an array of consultations.
  @Query (() => [Consultation])
  async getPatientConsultations (
    @Arg('patientId') id: number,
    @Ctx() { consultationRepo }: CustomContext
  ): Promise<Consultation[]|null> {
    try {
      const consultations = await consultationRepo.find({patientId:id}, {populate: ['patientId']});
      if (!consultations) throw new Error (`Could not find consultations for patient with id ${id}`);
      return consultations;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  
  
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

  //3. Mutation - update a consultation via id. Should be able to update any field.
  @Mutation(() => Consultation)
  async updateConsultation (
    @Ctx() {consultationRepo}: CustomContext,
    @Arg('id') id: number,
    @Arg('newData') newData: UpdateConsultationInput  
  ): Promise<Consultation|null> {
    try {
      const consultation = await consultationRepo.findOne(id);
      if (!consultation) throw new Error (`Consultation with ${id} not found`);
      wrap(consultation).assign(newData);
      await consultationRepo.persistAndFlush(consultation);
      return consultation;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  @FieldResolver()
  async patientId (@Root() newConsult: Consultation, @Ctx() {patientRepo}: CustomContext): Promise<Patient|null> {
    try {
      const patient = await patientRepo.findOne(newConsult.patientId);
      return patient;

    } catch (e) {
      console.log(e);
      return null;
    }
  }

}