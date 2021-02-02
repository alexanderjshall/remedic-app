import Patient from '../../entities/patient';
import { Arg, Ctx, Field, InputType, Mutation, Query, Resolver } from 'type-graphql';
import { CustomContext } from '..';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { wrap } from '@mikro-orm/core';
import { setRefreshToken, createRefreshToken, createAccessToken } from '../../utils/auth';

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

  @Field(() => String)
  postCode: string;
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

  @Field(() => String, {nullable: true})
  postCode?: string;
}


@Resolver(Patient)
export default class PatientResolver {

  // 1. Mutation - create patient. Check email does not already exist. Returns a patient (w/o password) or null.
  @Mutation(() => String)
  async createPatient (
    @Arg('patientInput') newPatient: PatientInput,
    @Ctx() {patientRepo, res}: CustomContext
  ) : Promise<string | null> {
    try {
      const patientAlreadyExists = await patientRepo.findOne({email: newPatient.email});
      if (patientAlreadyExists) throw new Error (`${newPatient.email}: patient email already registered`);

      const patient = patientRepo.create(newPatient);
      patient.password = await bcrypt.hash(patient.password,10);
      await patientRepo.persistAndFlush(patient);

      setRefreshToken(res, createRefreshToken(patient.id)); // Set the refresh token inside a httpOnly cookie
      return createAccessToken({id: patient.id, isDoctor: false, language: patient.language}); // Return access token
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  // 2. Mutation - Login: check if patient exists, check password, return patient i or null
  @Query(() => String, {nullable: true})
  async loginPatient (
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { patientRepo, res }: CustomContext
  ): Promise<string|null> {
    try {
      const patient = await patientRepo.findOne({email});
      if (!patient) throw new Error (`${email}: No patient found`);

      const passwordValid = await bcrypt.compare(password, patient.password);
      if (!passwordValid) throw new Error (`${email}: patient invalid password`);

      setRefreshToken(res, createRefreshToken(patient.id)); // Set the refresh token inside a httpOnly cookie
      return createAccessToken({id: patient.id, isDoctor: false, language: patient.language}); // Return access token
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  // 3. patient login with JWT - if refresh token is found in cookies and it's valid, login automatically
  @Query(() => String, {nullable: true})
  async loginWithTokenPatient (
    @Ctx() { patientRepo , req }: CustomContext
  ): Promise<string|null> {
    try {
      const refreshToken = req.cookies['rtc'];
      if (!refreshToken) return null;

      const {id} = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as { id:number };
      const patient = await patientRepo.findOne({id});
      if (!patient) throw new Error(`Patient with id ${id} not found`);
      return createAccessToken({id: patient.id, isDoctor: false, language: patient.language});
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  //4. Query - get patient by id
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

  //5. Mutation - Edit patient data
  @Mutation(() => Patient)
  async updatePatient (
    @Ctx() { patientRepo }: CustomContext,
    @Arg('id') id: number,
    @Arg('newData') newData: UpdatePatientInput,
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
