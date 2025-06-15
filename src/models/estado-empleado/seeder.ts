import { QueryInterface } from "sequelize";
import { TableName } from ".";
import { EstadoEmpleado } from "../../types/db/estado-empleado";

const seed = async (qi: QueryInterface) => {
  await qi.bulkInsert(TableName, [
    { nombre: "activo" },
    { nombre: "inactivo" },
    { nombre: "entrenamiento" },
    { nombre: "despedido" },
  ] as EstadoEmpleado[]);
};

export { seed };
export default { seed };
