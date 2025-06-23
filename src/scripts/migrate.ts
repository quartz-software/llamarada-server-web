import env from "../config/env";
import sequelize from "../models";
import { migrateDb } from "../models/migrate";

(async () => {
  if (env === "dev") {
    console.log("------Eliminando el SCHEMA------");
    await sequelize.query("DROP SCHEMA public CASCADE;");
    await sequelize.query("CREATE SCHEMA public;");
  }
  await migrateDb();
  await sequelize.close();
})();
