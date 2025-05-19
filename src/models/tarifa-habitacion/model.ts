import { Model } from "sequelize";
import { sequelize } from "../index";
import Attributes from "./attributes";
import { Attributes as Attr, CreationAttributes, Entity, TableName } from ".";

class TarifaHabitacionModel
  extends Model<Attr, CreationAttributes>
  implements Entity
{
  declare idHabitacion: number;
  declare idTarifa: number;
}

TarifaHabitacionModel.init(Attributes, {
  sequelize,
  tableName: TableName,
  timestamps: false,
});

export { TarifaHabitacionModel };
export default { TarifaHabitacionModel };
