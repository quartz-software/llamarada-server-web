// @ts-ignore
import { envs } from "./env";

const appConfig = {
  port: envs.PORT!,
  secret: envs.SECRET!,
};

export default appConfig;
