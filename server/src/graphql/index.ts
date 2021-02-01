import { ApolloServer } from 'apollo-server-express';
import PatientResolver from './resolvers/patient.resolver';
import { buildSchema } from 'type-graphql';


export const apolloServer = async (): Promise<ApolloServer> => 
  new ApolloServer({
    schema: await buildSchema({
      resolvers: [PatientResolver],
      validate: false
    })});
