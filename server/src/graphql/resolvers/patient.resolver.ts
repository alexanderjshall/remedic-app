import Patient from '../../entities/patient';
import { Arg, Ctx, Field, InputType, Mutation, Query, Resolver, Int } from 'type-graphql';
import { CustomContext } from '..';
import bcrypt from 'bcrypt';
import { wrap } from '@mikro-orm/core';

@InputType()
class PatientInput {
  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  language: string;

  @Field(() => Int)
  postCode: number;
}

@InputType()
class UpdatePatientInput {
  @Field(() => String, {nullable: true})
  firstName?: string;

  @Field(() => String, {nullable: true})
  lastName?: string;

  @Field(() => String, {nullable: true})
  email?: string;

  @Field(() => String, {nullable: true})
  password?: string;

  @Field(() => String, {nullable: true})
  language?: string;

  @Field(() => Int, {nullable: true})
  postCode?: number;
}


@Resolver(Patient)
export default class PatientResolver {

  // 1. Mutation - create patient. Check email does not already exist. Returns a patient (w/o password) or null.
  @Mutation(() => Patient)
  async createPatient (
    @Arg('patientInput') newPatient: PatientInput,
    @Ctx() {patientRepo}: CustomContext
  ) : Promise<Patient | null> {
    try {
      const patientAlreadyExists = await patientRepo.findOne({email: newPatient.email});
      if (patientAlreadyExists) throw new Error (`${newPatient.email}: patient email already registered`);

      const patient = patientRepo.create(newPatient);
      patient.password = await bcrypt.hash(patient.password,10);
      await patientRepo.persistAndFlush(patient);

      return patient;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  // 2. Mutation - Login: check if patient exists, check password, return patient i or null
  @Query(() => Int, {nullable: true})
  async loginPatient (
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { patientRepo }: CustomContext
  ): Promise<number|null> {
    try {
      const patient = await patientRepo.findOne({email});
      if (!patient) throw new Error (`${email}: No patient found`);

      const passwordValid = await bcrypt.compare(password, patient.password);
      if (!passwordValid) throw new Error (`${email}: patient invalid password`);
      return patient.id;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  //3. Query - get patient by id
  @Query(() => Patient)
  async getPatient (
    @Ctx() { patientRepo }: CustomContext,
    @Arg('id') id: number,
  ): Promise<Patient|null> {
    try {
      const patient = await patientRepo.findOne({id}, {populate: ['consultations']});
      return patient;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  //4. Mutation - Edit patient data
  @Mutation(() => Patient)
  async updatePatient (
    @Ctx() { patientRepo }: CustomContext,
    @Arg('id') id: number,
    @Arg('newData', {nullable: true}) newData: UpdatePatientInput,
  ): Promise<Patient|null> {
    try {
      const patient = await patientRepo.findOne({id});
      if (!patient) throw new Error(`Patient with id ${id} not found`);
      wrap(patient).assign(newData);
      await patientRepo.persistAndFlush(patient);
      return patient;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

}
