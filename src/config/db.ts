// @ts-ignore
import { envs } from "./env";
const dbConfig = {
  name: envs.DB_NAME!,
  user: envs.DB_USER!,
  pass: envs.DB_PASS!,
  host: envs.DB_HOST!,
};

export default dbConfig;
