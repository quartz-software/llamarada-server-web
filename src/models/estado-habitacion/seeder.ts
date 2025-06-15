import { QueryInterface } from "sequelize";
import { CreationAttributes, TableName } from ".";

const seed = async (qi: QueryInterface) => {
  const list: CreationAttributes[] = [
    { nombre: "disponible" },
    { nombre: "ocupada" },
    { nombre: "reservada" },
    { nombre: "bloqueada" },
    { nombre: "limpieza" },
    { nombre: "mantenimiento" },
    { nombre: "no disponible" },
  ];
  await qi.bulkInsert(TableName, list);
};

export { seed };
export default { seed };
