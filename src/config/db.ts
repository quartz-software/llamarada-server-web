// @ts-ignore
import env from "./env";

const dbConfig = {
  name: process.env.DB_NAME!,
  user: process.env.DB_USER!,
  pass: process.env.DB_PASS!,
  host: process.env.DB_HOST!,
};

export default dbConfig;
