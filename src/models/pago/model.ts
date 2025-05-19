import { Model } from "sequelize";
import { sequelize } from "../index";
import Attributes from "./attributes";
import { Attributes as Attr, CreationAttributes, Entity, TableName } from ".";
import { DetallePago } from "../../types/db/detalle-pago";
import { Reserva } from "../../types/db/reserva";

class PagoModel extends Model<Attr, CreationAttributes> implements Entity {
  declare id: number;
  declare fechaPago: Date;
  declare montoTotal: number;
  declare metodo: string;
  declare idReserva: string;
  declare detalles?: DetallePago[] | undefined;
  declare reserva?: Reserva | undefined;
}

PagoModel.init(Attributes, {
  sequelize,
  tableName: TableName,
  timestamps: false,
});

export { PagoModel };
export default { PagoModel };
