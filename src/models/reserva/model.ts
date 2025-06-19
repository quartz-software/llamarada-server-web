import { Model } from "sequelize";
import { sequelize } from "../index";
import Attributes from "./attributes";
import { type Attributes as Attr, CreationAttributes, Entity, TableName } from ".";
import { Cliente } from "../../types/db/cliente";
import { Empleado } from "../../types/db/empleado";
import { EstadoReserva } from "../../types/db/estado-reserva";
import { Habitacion } from "../../types/db/habitacion";
import { Pago } from "../../types/db/pago";
import { ServicioSolicitado } from "../../types/db/servicio-solicitado";

class ReservaModel extends Model<Attr, CreationAttributes> implements Entity {
  declare id: number;
  declare numAdultos: number;
  declare numNinos: number;
  declare checkIn: Date;
  declare checkOut: Date;
  declare checkOutReal?: Date | undefined;
  declare precioTotal?: number | undefined;
  declare origenReserva: "web" | "system";
  declare createdAt: Date;

  declare idEmpleado?: number | undefined;
  declare idEstado: number;
  declare idCliente: number;

  declare empleado?: Empleado | undefined;
  declare cliente?: Cliente | undefined;
  declare estado?: EstadoReserva | undefined;
  declare habitaciones?: Habitacion[] | undefined;
  declare pagos?: Pago[] | undefined;
  declare servicios?: ServicioSolicitado[] | undefined;
}

ReservaModel.init(Attributes, {
  sequelize,
  tableName: TableName,
  timestamps: true,
  updatedAt: false,
});

export { ReservaModel };
export default { ReservaModel };
