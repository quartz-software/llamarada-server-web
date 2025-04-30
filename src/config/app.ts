import dotenv from "dotenv";
dotenv.config();

const appConfig = {
  nodeEnv: process.env.NODE_ENV!,
  port: process.env.PORT!,
  secret: process.env.SECRET!,
};

export default appConfig;
