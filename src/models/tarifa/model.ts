import { Model } from "sequelize";
import { sequelize } from "../index";
import Attributes from "./attributes";
import { Attributes as Attr, CreationAttributes, Entity, TableName } from ".";
import { Habitacion } from "../../types/db/habitacion";

class TarifaModel extends Model<Attr, CreationAttributes> implements Entity {
  declare id: number;
  declare fechaInicio?: Date | undefined;
  declare fechaFin?: Date | undefined;
  declare precio: number;
  declare activo: boolean;
  declare habitaciones?: Habitacion[] | undefined;
}

TarifaModel.init(Attributes, {
  sequelize,
  tableName: TableName,
  timestamps: false,
});

export { TarifaModel };
export default { TarifaModel };
