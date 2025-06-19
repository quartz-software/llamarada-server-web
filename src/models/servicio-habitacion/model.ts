import { Model } from "sequelize";
import { sequelize } from "../index";
import Attributes from "./attributes";
import { type Attributes as Attr, CreationAttributes, Entity, TableName } from ".";

class ServicioHabitacionModel
  extends Model<Attr, CreationAttributes>
  implements Entity {
  declare idServicio: number;
  declare idHabitacion: number;
}

ServicioHabitacionModel.init(Attributes, {
  sequelize,
  tableName: TableName,
  timestamps: false,
});

export { ServicioHabitacionModel };
export default { ServicioHabitacionModel };
