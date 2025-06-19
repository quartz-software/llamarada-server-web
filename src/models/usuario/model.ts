import { Model } from "sequelize";
import { sequelize } from "../index";
import Attributes from "./attributes";
import { type Attributes as Attr, CreationAttributes, Entity, TableName } from ".";
import { Cliente } from "../../types/db/cliente";
import { Empleado } from "../../types/db/empleado";

class UsuarioModel extends Model<Attr, CreationAttributes> implements Entity {
  declare id: number;
  declare correo: string;
  declare password: string;

  declare empleado?: Empleado | undefined;
  declare cliente?: Cliente | undefined;
}

UsuarioModel.init(Attributes, {
  sequelize,
  tableName: TableName,
  timestamps: false,
});

export { UsuarioModel };
export default { UsuarioModel };
