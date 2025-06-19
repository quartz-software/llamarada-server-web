import { Model } from "sequelize";
import { sequelize } from "../index";
import Attributes from "./attributes";
import { type Attributes as Attr, CreationAttributes, Entity, TableName } from ".";
import { Servicio } from "../../types/db/servicio";
import { EstadoServicioSolicitado } from "../../types/db/estado-servicio-solicitado";
import { Habitacion } from "../../types/db/habitacion";
import { Reserva } from "../../types/db/reserva";
import { Tarea } from "../../types/db/tarea";

class ServicioSolicitadoModel
  extends Model<Attr, CreationAttributes>
  implements Entity {
  declare id: number;
  declare descripcion: string;
  declare createdAt: Date;
  declare idEstado: number;
  declare idServicio: number;
  declare idReserva: number;
  declare idHabitacion: number;
  declare estado?: EstadoServicioSolicitado | undefined;
  declare servicio?: Servicio | undefined;
  declare reserva?: Reserva | undefined;
  declare habitacion?: Habitacion | undefined;
  declare tarea?: Tarea | undefined;
}

ServicioSolicitadoModel.init(Attributes, {
  sequelize,
  tableName: TableName,
  timestamps: true,
  updatedAt: false,
});

export { ServicioSolicitadoModel };
export default ServicioSolicitadoModel;
