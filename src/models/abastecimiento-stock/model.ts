import { Model } from "sequelize";
import { sequelize } from "../index";
import Attributes from "./attributes";
import { Attributes as Attr, CreationAttributes, Entity, TableName } from ".";
import { Stock } from "../../types/stock";

class AbastecimientoStockModel
  extends Model<Attr, CreationAttributes>
  implements Entity
{
  declare id: number;
  declare proveedor: string;
  declare fecha: Date;
  declare cantidad: number;
  declare idStock: number;
  declare stock?: Stock | undefined;
}

AbastecimientoStockModel.init(Attributes, {
  sequelize,
  tableName: TableName,
  timestamps: false,
});

export { AbastecimientoStockModel };
export default { AbastecimientoStockModel };
