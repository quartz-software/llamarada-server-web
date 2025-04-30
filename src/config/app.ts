import dotenv from "dotenv";
dotenv.config();

const appConfig = {
  port: process.env.PORT!,
  secret: process.env.SECRET!,
};

export default appConfig;
