import { Sequelize } from 'sequelize';

import dbConfig from '../config/db';
import env from '../config/env';
let ssl:
  | {
      require: true;
      rejectUnauthorized: false;
    }
  | undefined = undefined;
if (env.env === 'prod' || env.env === 'test') {
  ssl = {
    require: true,
    rejectUnauthorized: false,
  };
}
const sequelize = new Sequelize(dbConfig.name, dbConfig.user, dbConfig.pass, {
  dialect: 'postgres',
  host: dbConfig.host,
  logging: false,
});

export { sequelize };
export default sequelize;
