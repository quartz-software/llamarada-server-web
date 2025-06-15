import { QueryInterface } from "sequelize";
import { Empleado } from "../../types/db/empleado";
import { TableName } from ".";

const seed = async (qi: QueryInterface) => {
  const d = new Date();
  await qi.bulkInsert(TableName, [
    {
      idUsuario: 1,
      idRol: 1,
      idEstado: 1,
      fechaContratacion: d,
      dni: "1234",
      nombre1: "admin",
      apellido1: "1",
      telefono: "1234",
    },
    {
      idUsuario: 2,
      idRol: 2,
      idEstado: 1,
      fechaContratacion: d,
      dni: "1234",
      nombre1: "recep",
      apellido1: "1",
      telefono: "1234",
    },
    {
      idUsuario: 3,
      idRol: 3,
      idEstado: 1,
      fechaContratacion: d,
      dni: "1234",
      nombre1: "limp",
      apellido1: "1",
      telefono: "1234",
    },
    {
      idUsuario: 4,
      idRol: 4,
      idEstado: 1,
      fechaContratacion: d,
      dni: "1234",
      nombre1: "mant",
      apellido1: "1",
      telefono: "1234",
    },
  ] as Empleado[]);
};

export { seed };
export default { seed };
