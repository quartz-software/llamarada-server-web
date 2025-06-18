import { QueryInterface } from "sequelize";
import { CreationAttributes, TableName } from ".";

const seed = async (qi: QueryInterface) => {
  const list: CreationAttributes[] = [
    { nombre: "limpio" },
    { nombre: "sucio" },
  ];
  await qi.bulkInsert(TableName, list);
};

export { seed };
export default { seed };
