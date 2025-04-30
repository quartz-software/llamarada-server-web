import { sequelize } from "../models/index.js";

(async () => {
  try {
    await sequelize.sync({ force: true });
  } catch (error) {
    console.error(error);
  }
})();
