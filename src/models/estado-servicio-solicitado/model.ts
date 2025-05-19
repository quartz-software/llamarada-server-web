import { Model } from "sequelize";
import { sequelize } from "../index";
import Attributes from "./attributes";
import { Attributes as Attr, CreationAttributes, Entity, TableName } from ".";
import { Servicio } from "../../types/db/servicio";

class EstadoServicioSolicitadoModel
  extends Model<Attr, CreationAttributes>
  implements Entity
{
  declare nombre: "activo" | "pendiente" | "finalizado" | "cancelado";
  declare servicios?: Servicio | undefined;
  declare id: number;
}

EstadoServicioSolicitadoModel.init(Attributes, {
  sequelize,
  tableName: TableName,
  timestamps: false,
});

export { EstadoServicioSolicitadoModel };
export default { EstadoServicioSolicitadoModel };
