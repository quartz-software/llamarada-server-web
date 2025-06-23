import dotenv from "dotenv";
import path from "path";

type EnvMode = "dev" | "test" | "prod";
const env: EnvMode = (process.env.NODE_ENV as EnvMode) || "prod";
if (env === "dev" || env === "test") {
  dotenv.config({ path: path.resolve(__dirname, `../../.env.${env}`) });
} else {
  dotenv.config();
}
const envs = process.env;

export default { env, envs };
export { env, envs };
