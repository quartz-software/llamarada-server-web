import { sequelize } from "../src/models";

export default async () => {
  await sequelize.close();
};
