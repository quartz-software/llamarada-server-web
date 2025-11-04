import { Sequelize } from "sequelize";

import dbConfig from "../config/db";
const sequelize = new Sequelize(dbConfig.name, dbConfig.user, dbConfig.pass, {
  dialect: 'postgres',
  host: dbConfig.host,
  ssl: true,
  logging: false,
});

export { sequelize };
export default sequelize;
