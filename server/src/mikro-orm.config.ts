import dotenv from 'dotenv';
dotenv.config();

import { MikroORM } from '@mikro-orm/core';
import path from 'path';

export default {
  migrations: {
    path: path.join(__dirname, '/migrations'),
    pattern: /^[\w-]+\d+\.[tj]s$/
  },
  entities: [],
  dbName: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  type: 'postgresql',
  debug: process.env.NODE_ENV !== 'production',
} as Parameters<typeof MikroORM.init>[0];