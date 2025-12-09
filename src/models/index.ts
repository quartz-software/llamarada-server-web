import { Sequelize } from 'sequelize';

import dbConfig from '../config/db';
let ssl:
  | {
      require: boolean;
      rejectUnauthorized: boolean;
    }
  | boolean = false;
if (dbConfig.ssl === 'true') {
  ssl = {
    require: true,
    rejectUnauthorized: false,
  };
}
const sequelize = new Sequelize(dbConfig.name, dbConfig.user, dbConfig.pass, {
  dialect: 'postgres',
  host: dbConfig.host,
  logging: dbConfig.logging,
  dialectOptions: ssl ? { ssl } : {},
});

export { sequelize };
export default sequelize;
