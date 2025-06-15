import { QueryInterface } from "sequelize";
import { TableName } from ".";
import { Usuario } from "../../types/db/usuario";
import { encryptPassword } from "../../utils/auth";

const seed = async (qi: QueryInterface) => {
  await qi.bulkInsert(TableName, [
    {
      correo: "admin1@email.com",
      password: await encryptPassword("admin1pass"),
    },
    {
      correo: "rec1@email.com",
      password: await encryptPassword("rec1pass"),
    },
    {
      correo: "limp1@email.com",
      password: await encryptPassword("limp1pass"),
    },
    {
      correo: "mant1@email.com",
      password: await encryptPassword("mant1pass"),
    },
  ] as Usuario[]);
};

export { seed };
export default { seed };
