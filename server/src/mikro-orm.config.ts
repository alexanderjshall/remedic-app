import dotenv from 'dotenv';
dotenv.config();

import { MikroORM } from '@mikro-orm/core';
import path from 'path';
import Patient from './entities/patient';
import Doctor from './entities/doctor';
import Consultation from './entities/consultation';

export default {
  migrations: {
    path: path.join(__dirname, '/migrations'),
    pattern: /^[\w-]+\d+\.[tj]s$/
  },
  entities: [Patient, Doctor, Consultation],
  clientUrl: process.env.DATABASE_URL,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  type: 'postgresql',
  debug: process.env.NODE_ENV !== 'production',
} as Parameters<typeof MikroORM.init>[0];