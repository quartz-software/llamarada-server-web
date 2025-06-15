import { QueryInterface } from "sequelize";
import { TableName, CreationAttributes } from ".";

const seed = async (qi: QueryInterface) => {
  const list: CreationAttributes[] = [
    { nombre: "cleaning" },
    { nombre: "food" },
    { nombre: "maintenance" },
  ];
  await qi.bulkInsert(TableName, list);
};

export { seed };
export default { seed };
