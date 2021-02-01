import { ApolloServer } from 'apollo-server-express';
import PatientResolver from './resolvers/patient.resolver';
import { buildSchema } from 'type-graphql';
import { EntityManager, IDatabaseDriver, Connection, EntityRepository } from '@mikro-orm/core';
import Doctor from '../entities/doctor';
import DoctorResolver from './resolvers/doctor.resolver';
import Patient from '../entities/patient';
import Consultation from '../entities/consultation';

type dbConnection = EntityManager<IDatabaseDriver<Connection>>;
export type CustomContext = {
  doctorRepo: EntityRepository<Doctor>
  patientRepo: EntityRepository<Patient>
  consultationRepo: EntityRepository<Consultation>
}

export const apolloServer = async (em: dbConnection): Promise<ApolloServer> => 
  new ApolloServer({
    schema: await buildSchema({
      resolvers: [PatientResolver, DoctorResolver],
      validate: false
    }),
    context: () : CustomContext => ({
      doctorRepo: em.getRepository(Doctor),
      patientRepo: em.getRepository(Patient),
      consultationRepo: em.getRepository(Consultation)
    })
  });
