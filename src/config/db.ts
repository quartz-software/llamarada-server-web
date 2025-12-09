// @ts-ignore
import { envs } from './env';
const dbConfig = {
  name: envs.DB_NAME!,
  user: envs.DB_USER!,
  pass: envs.DB_PASS!,
  host: envs.DB_HOST!,
  ssl: envs.DB_SSL!,
};

export default dbConfig;
