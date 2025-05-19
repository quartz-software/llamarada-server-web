import { Model } from "sequelize";
import { sequelize } from "../index";
import Attributes from "./attributes";
import { Attributes as Attr, CreationAttributes, Entity, TableName } from ".";
import { Habitacion } from "../../types/db/habitacion";

class OcupacionModel extends Model<Attr, CreationAttributes> implements Entity {
  declare id: number;
  declare fecha: Date;
  declare idHabitacion: number;
  declare habitacion?: Habitacion | undefined;
}

OcupacionModel.init(Attributes, {
  sequelize,
  tableName: TableName,
  timestamps: false,
});

export { OcupacionModel };
export default { OcupacionModel };
