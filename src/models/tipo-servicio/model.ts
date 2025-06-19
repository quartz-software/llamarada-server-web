import { Model } from "sequelize";
import { sequelize } from "../index";
import Attributes from "./attributes";
import { type Attributes as Attr, CreationAttributes, Entity, TableName } from ".";
import { Servicio } from "../../types/db/servicio";

class TipoServicioModel
  extends Model<Attr, CreationAttributes>
  implements Entity {
  declare id: number;
  declare nombre: "limpieza" | "alimentos";
  declare servicios?: Servicio[] | undefined;
}

TipoServicioModel.init(Attributes, {
  sequelize,
  tableName: TableName,
  timestamps: false,
});

export { TipoServicioModel };
export default { TipoServicioModel };
