import { Model } from "sequelize";
import { sequelize } from "../index";
import Attributes from "./attributes";
import { type Attributes as Attr, CreationAttributes, Entity, TableName } from ".";
import { EstadosPDI } from "../../types/db/estado-pdi";
import { ImagenPDI } from "../../types/db/imagen-pdi";

class EstadoPDIModel extends Model<Attr, CreationAttributes> implements Entity {
  declare id: number;
  declare nombre: EstadosPDI;
  declare imagenes?: ImagenPDI[] | undefined;
}

EstadoPDIModel.init(Attributes, {
  sequelize,
  tableName: TableName,
  timestamps: false,
});

export { EstadoPDIModel };
export default { EstadoPDIModel };
