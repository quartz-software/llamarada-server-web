import { Model } from "sequelize";
import { sequelize } from "../index";
import Attributes from "./attributes";
import { type Attributes as Attr, CreationAttributes, Entity, TableName } from ".";
import { Reserva } from "../../types/db/reserva";

class EstadoReservaModel
  extends Model<Attr, CreationAttributes>
  implements Entity {
  declare id: number;
  declare nombre: "activo" | "pendiente" | "finalizado" | "cancelado";
  declare reservas?: Reserva[] | undefined;
}

EstadoReservaModel.init(Attributes, {
  sequelize,
  tableName: TableName,
  timestamps: false,
});

export { EstadoReservaModel };
export default { EstadoReservaModel };
