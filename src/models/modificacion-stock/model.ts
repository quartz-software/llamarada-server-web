import { Model } from "sequelize";
import { sequelize } from "../index";
import Attributes from "./attributes";
import { Attributes as Attr, CreationAttributes, Entity, TableName } from ".";
import { Empleado } from "../../types/db/empleado";
import { Stock } from "../../types/db/stock";

class ModificacionStockModel
  extends Model<Attr, CreationAttributes>
  implements Entity
{
  declare id: number;
  declare fecha: Date;
  declare cantidad: number;
  declare motivo?: string | undefined;
  declare idEmpleado: number;
  declare idStock: number;
  declare empleado?: Empleado | undefined;
  declare stock?: Stock | undefined;
}

ModificacionStockModel.init(Attributes, {
  sequelize,
  tableName: TableName,
  timestamps: false,
});

export { ModificacionStockModel };
export default { ModificacionStockModel };
