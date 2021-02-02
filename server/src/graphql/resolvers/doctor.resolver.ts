import Doctor from '../../entities/doctor';
import { Arg, Ctx, Field, InputType, Resolver, Mutation, Query } from 'type-graphql';
import { CustomContext } from '..';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createAccessToken, createRefreshToken, setRefreshToken } from '../../utils/auth';


@InputType()
class DoctorInput {
  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}

@Resolver(Doctor)
export default class DoctorResolver {
  //1. Mutation - create doctor. For now assume sys admin can create doctors from backend.
  @Mutation(() => Doctor)
  async createDoctor (
    @Arg('doctorInput') newDoctor: DoctorInput,
    @Ctx() { doctorRepo }: CustomContext
  ): Promise<Doctor|null> {
    try {

      const checkEmail = await doctorRepo.findOne({email: newDoctor.email});
      if (checkEmail) throw new Error (`${newDoctor.email}: doctor email already registered`);

      const doctor = doctorRepo.create(newDoctor);
      doctor.password = await bcrypt.hash(doctor.password,10);
      await doctorRepo.persistAndFlush(doctor);
      return doctor;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  // 2. doctor login - check if doctor exists, check password, return doctor id or null
  @Query(() => String, {nullable: true})
  async loginDoctor (
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { doctorRepo , res}: CustomContext
  ): Promise<string|null> {
    try {
      const doctor = await doctorRepo.findOne({email});
      if (!doctor) throw new Error (`${email}: No doctor found`);

      const passwordValid = await bcrypt.compare(password, doctor.password);
      if (!passwordValid) throw new Error (`${email}: Doctor invalid password`);

      setRefreshToken(res, createRefreshToken(doctor.id)); // Set the refresh token inside a httpOnly cookie
      return createAccessToken({id: doctor.id, isDoctor: true, language: doctor.language}); // Return access token
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  // 3. doctor login with JWT - if refresh token is found in cookies and it's valid, login automatically
  @Query(() => String, {nullable: true})
  async loginWithTokenDoctor (
    @Ctx() { doctorRepo , req }: CustomContext
  ): Promise<string|null> {
    try {
      const refreshToken = req.cookies['rtc'];
      if (!refreshToken) return null;

      const {id} = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as { id:number };
      const doctor = await doctorRepo.findOne({id});
      if (!doctor) throw new Error (`Doctor with id ${id} not found`);
      return createAccessToken({id: doctor.id, isDoctor: true, language: doctor.language});
    } catch (error) {
      console.log(error);
      return null;
    }

  }

  //4. Query - get one doctor by id, or docPublicCode
  @Query(() => Doctor)
  async getDoctor (
    @Ctx() { doctorRepo }: CustomContext,
    @Arg('id', {nullable: true}) id?: number,
    @Arg('docPublicCode', {nullable: true}) docPublicCode?: string
  ): Promise<Doctor|null> {
    try {
      const where = {} as {id: number; docPublicCode: string;};
      if (id) where.id =id;
      if (docPublicCode) where.docPublicCode = docPublicCode;
      const doctor = await doctorRepo.findOne(where, {populate: ['consultations']});
      return doctor;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
