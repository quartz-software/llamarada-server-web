import { env } from "../src/config/env";
import { sequelize } from "../src/models"; // importa tu instancia de sequelize
import { migrateDb } from "../src/models/migrate";
import { seedDb } from "../src/models/seed";

export default async () => {
  if (env === "test" || env === "dev") {
    await sequelize.authenticate();
    await sequelize.query("DROP SCHEMA public CASCADE;");
    await sequelize.query("CREATE SCHEMA public;");
    await migrateDb();
    await seedDb();
  }
};
