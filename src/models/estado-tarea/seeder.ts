import { QueryInterface } from "sequelize";
import { CreationAttributes, TableName } from ".";

const seed = async (qi: QueryInterface) => {
  const list: CreationAttributes[] = [
    { nombre: "pendiente" },
    { nombre: "en progreso" },
    { nombre: "finalizado" },
    { nombre: "cancelado" },
  ];
  await qi.bulkInsert(TableName, list);
};

export { seed };
export default { seed };
