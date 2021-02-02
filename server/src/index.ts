import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { apolloServer } from './graphql';
import databaseConfig from './mikro-orm.config';
import { MikroORM } from '@mikro-orm/core';
import { setupSocketIO } from './chat';

dotenv.config();
const port = process.env.PORT;
const chatPort = process.env.CHAT_PORT;

const app = express();
app.use(cookieParser());

async function main () {

  const db = await MikroORM.init(databaseConfig);

  await db.getMigrator().up();

  const server = await apolloServer(db.em);

  server.applyMiddleware({ app });

  const chatServer = setupSocketIO(app);

  chatServer.listen( chatPort, () => {
    console.log(`socket.io ready at http://localhost:${chatPort} 📨`);
  });

  app.listen(port, () => {
    console.log(`listening at http://localhost:${port}/graphql  🚀`);
  });
}

main();
