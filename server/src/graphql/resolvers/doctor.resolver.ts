import Doctor from '../../entities/doctor';
import { Arg, Ctx, Field, InputType, Resolver, Mutation, Query,Int } from 'type-graphql';
import { CustomContext } from '..';
import bcrypt from 'bcrypt';


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
      
      const checkEmail = doctorRepo.findOne({email: newDoctor.email});
      if (checkEmail) throw new Error (`${newDoctor.email}: doctor email already registered`);

      const doctor = doctorRepo.create(newDoctor);
      doctor.password = await bcrypt.hash(doctor.password,10);
      console.log('doctor', doctor);
      await doctorRepo.persistAndFlush(doctor);
      return doctor;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  // 2. doctor login - check if doctor exists, check password, return doctor id or null
  @Query(() => Int, {nullable: true})
  async loginDoctor (
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { doctorRepo }: CustomContext
  ): Promise<number|null> {
    try {
      const doctor = await doctorRepo.findOne({email});
      if (!doctor) throw new Error (`${email}: No doctor found`);

      const passwordValid = await bcrypt.compare(password, doctor.password);
      if (!passwordValid) throw new Error (`${email}: Doctor invalid password`);
      return doctor.id;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  //3. Query - get one doctor by id, or docPublicCode
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
      const doctor = await doctorRepo.findOne(where);
      return doctor;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}