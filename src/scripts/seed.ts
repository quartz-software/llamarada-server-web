import { seedDb } from "../models/seed";
import sequelize from "../models";

(async () => {
  await seedDb();
  await sequelize.close();
})();
