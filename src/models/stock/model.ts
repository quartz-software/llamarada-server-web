import { Model } from "sequelize";
import { sequelize } from "../index";
import Attributes from "./attributes";
import { Attributes as Attr, CreationAttributes, Entity, TableName } from ".";
import { CategoriaStock } from "../../types/db/categoria-stock";
import { AbastecimientoStock } from "../../types/db/abastecimiento-stock";
import { ModificacionStock } from "../../types/db/modificacion-stock";

class StockModel extends Model<Attr, CreationAttributes> implements Entity {
  declare id: number;
  declare nombre: string;
  declare cantidad: number;
  declare unidadMedida: string;
  declare idCategoria: number;
  declare categoria?: CategoriaStock[] | undefined;
  declare abastecimientos?: AbastecimientoStock[] | undefined;
  declare modificaciones?: ModificacionStock[] | undefined;
}

StockModel.init(Attributes, {
  sequelize,
  tableName: TableName,
  timestamps: false,
});

export { StockModel };
export default { StockModel };
