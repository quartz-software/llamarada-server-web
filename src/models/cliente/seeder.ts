import { QueryInterface } from "sequelize";
import { CreationAttributes, TableName } from ".";

const seed = async (qi: QueryInterface) => {
  const clientes: CreationAttributes[] = [
    {
      nombre1: "asd",
      apellido1: "asd",
      dni: "123213",
      idUsuario: 5,
      pais: "BO",
    },
  ];
  await qi.bulkInsert(TableName, clientes);
};

export { seed };
export default { seed };
