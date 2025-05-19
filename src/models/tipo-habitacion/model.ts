import { Model } from "sequelize";
import { sequelize } from "../index";
import Attributes from "./attributes";
import { Attributes as Attr, CreationAttributes, Entity, TableName } from ".";
import { Habitacion } from "../../types/habitacion";

class TipoHabitacionModel
  extends Model<Attr, CreationAttributes>
  implements Entity
{
  declare id: number;
  declare nombre: string;
  declare habitaciones?: Habitacion[] | undefined;
}

TipoHabitacionModel.init(Attributes, {
  sequelize,
  tableName: TableName,
  timestamps: false,
});

export { TipoHabitacionModel };
export default { TipoHabitacionModel };
