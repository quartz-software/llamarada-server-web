import { Model } from "sequelize";
import { sequelize } from "../index";
import Attributes from "./attributes";
import { type Attributes as Attr, CreationAttributes, Entity, TableName } from ".";
import { Servicio } from "../../types/db/servicio";

class PromocionServicioModel
  extends Model<Attr, CreationAttributes>
  implements Entity {
  declare id: number;
  declare fechaInicio: Date;
  declare fechaFin: Date;
  declare precio: number;
  declare activo: boolean;
  declare idServicio: number;
  declare servicio?: Servicio | undefined;
}

PromocionServicioModel.init(Attributes, {
  sequelize,
  tableName: TableName,
  timestamps: false,
});

export { PromocionServicioModel };
export default { PromocionServicioModel };
