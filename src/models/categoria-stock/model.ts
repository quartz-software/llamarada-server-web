import { Model } from "sequelize";
import { sequelize } from "../index";
import Attributes from "./attributes";
import { Attributes as Attr, CreationAttributes, Entity, TableName } from ".";
import { Stock } from "../../types/stock";

class CategoriaStockModel
  extends Model<Attr, CreationAttributes>
  implements Entity
{
  declare id: number;
  declare nombre: "food" | "maintenance" | "cleaning";

  declare stocks?: Stock[] | undefined;
}

CategoriaStockModel.init(Attributes, {
  sequelize,
  tableName: TableName,
  timestamps: false,
});

export { CategoriaStockModel };
export default { CategoriaStockModel };
