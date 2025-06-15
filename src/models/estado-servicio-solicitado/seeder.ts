import { QueryInterface } from "sequelize";
import { CreationAttributes, TableName } from ".";

const seed = async (qi: QueryInterface) => {
  const list: CreationAttributes[] = [
    { nombre: "activo" },
    { nombre: "pendiente" },
    { nombre: "finalizado" },
    { nombre: "cancelado" },
  ];
  await qi.bulkInsert(TableName, list);
};

export { seed };
export default { seed };
