// @ts-ignore
import { envs } from './env';
const dbConfig = {
  name: String(envs.DB_NAME || ''),
  user: String(envs.DB_USER || ''),
  pass: String(envs.DB_PASS || ''),
  host: String(envs.DB_HOST || ''),
  ssl: String(envs.DB_SSL || ''),
};

export default dbConfig;
