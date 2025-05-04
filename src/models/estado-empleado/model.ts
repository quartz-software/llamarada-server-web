import { Model } from "sequelize";
import { sequelize } from "../index";
import Attributes from "./attributes";
import { Attributes as Attr, CreationAttributes, Entity, TableName } from ".";

class EstadoEmpleadoModel
  extends Model<Attr, CreationAttributes>
  implements Entity
{
  declare id: number;
  declare nombre: "activo" | "inactivo" | "entrenamiento" | "despedido";
}

EstadoEmpleadoModel.init(Attributes, {
  sequelize,
  tableName: TableName,
  timestamps: false,
});

export { EstadoEmpleadoModel };
export default { EstadoEmpleadoModel };
