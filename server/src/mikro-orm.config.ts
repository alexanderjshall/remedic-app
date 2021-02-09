import dotenv from 'dotenv';
dotenv.config();

import fs from 'fs';
import { MikroORM } from '@mikro-orm/core';
import path from 'path';
import Patient from './entities/patient';
import Doctor from './entities/doctor';
import Consultation from './entities/consultation';

const cert = fs.readFileSync(path.join( __dirname, '../server.crt')).toString();

export default {
  migrations: {
    path: path.join(__dirname, '/migrations'),
    pattern: /^[\w-]+\d+\.[tj]s$/
  },
  entities: [Patient, Doctor, Consultation],
  clientUrl: process.env.DATABASE_URL,
  type: 'postgresql',
  debug: process.env.NODE_ENV !== 'production',
  driverOptions: {
    connection: {
      ssl: {
        require: true,
        rejectUnauthorized: true,
        ca: cert
      }
    }
  }
} as Parameters<typeof MikroORM.init>[0];