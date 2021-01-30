import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import express from 'express';
import dotenv from 'dotenv';
import PatientResolver from './patient.resolver';

dotenv.config();
const port = process.env.PORT;

const app = express();

async function main () {
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PatientResolver],
      validate: false
    })
  });

  server.applyMiddleware({ app });

  app.listen(port, () => {
    console.log(`listening at http://localhost:${port}  🚀`);
  });
}

main();