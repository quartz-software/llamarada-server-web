import { Model } from "sequelize";
import { sequelize } from "../index";
import Attributes from "./attributes";
import { Attributes as Attr, CreationAttributes, Entity, TableName } from ".";

class ReservaHabitacionModel
  extends Model<Attr, CreationAttributes>
  implements Entity
{
  declare idHabitacion: number;
  declare idReserva: number;
}

ReservaHabitacionModel.init(Attributes, {
  sequelize,
  tableName: TableName,
  timestamps: true,
  updatedAt: false,
});

export { ReservaHabitacionModel };
export default { ReservaHabitacionModel };
