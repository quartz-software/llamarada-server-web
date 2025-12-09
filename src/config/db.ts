// @ts-ignore
import { envs } from './env';
const dbConfig = {
  name: String(process.env.DB_NAME || ''),
  user: String(process.env.DB_USER || ''),
  pass: String(process.env.DB_PASS || ''),
  host: String(process.env.DB_HOST || ''),
  ssl: String(process.env.DB_SSL || ''),
  logging: false,
};

export default dbConfig;
