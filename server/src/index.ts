import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { apolloServer } from './graphql';
import databaseConfig from './mikro-orm.config';
import { MikroORM } from '@mikro-orm/core';

dotenv.config();
const port = process.env.PORT;

const app = express();
app.use(cookieParser());

async function main () {

  const db = await MikroORM.init(databaseConfig);

  await db.getMigrator().up();

  const server = await apolloServer(db.em);

  server.applyMiddleware({ app });

  app.listen(port, () => {
    console.log(`listening at http://localhost:${port}  🚀`);
  });
}

main();
