import { QueryInterface } from "sequelize";
import { CreationAttributes, TableName } from ".";

const seed = async (qi: QueryInterface) => {
  const clientes: CreationAttributes[] = [
    {
      nombre1: "Juan",
      apellido1: "Perez",
      apellido2: "Gomez",
      dni: "1234567",
      idUsuario: 5,
      pais: "BO",
    },
  ];
  await qi.bulkInsert(TableName, clientes);
};

export { seed };
export default { seed };
