import { Model } from "sequelize";
import { sequelize } from "../index";
import Attributes from "./attributes";
import { Attributes as Attr, CreationAttributes, Entity, TableName } from ".";

class TipoRolModel extends Model<Attr, CreationAttributes> implements Entity {
  declare id: number;
  declare nombre:
    | "limpieza"
    | "mantenimiento"
    | "recepcionista"
    | "administrador";
}

TipoRolModel.init(Attributes, {
  sequelize,
  tableName: TableName,
  timestamps: false,
});

export { TipoRolModel };
export default { TipoRolModel };
