import { Model } from "sequelize";
import { sequelize } from "../index";
import Attributes from "./attributes";
import { Attributes as Attr, CreationAttributes, Entity, TableName } from ".";
import { EstadoHabitacion } from "../../types/estado-habitacion";
import { ImagenHabitacion } from "../../types/imagen-habitacion";
import { Ocupacion } from "../../types/ocupacion";
import { Reserva } from "../../types/reserva";
import { Servicio } from "../../types/servicio";
import { ServicioSolicitado } from "../../types/servicio-solicitado";
import { Tarifa } from "../../types/tarifa";
import { TipoHabitacion } from "../../types/tipo-habitacion";

class HabitacionModel
  extends Model<Attr, CreationAttributes>
  implements Entity
{
  declare id: number;
  declare numeroHabitacion: string;
  declare capacidad: number;
  declare descripcion?: string | undefined;
  declare idEstadoHabitacion: number;
  declare idTipoHabitacion: number;
  declare serviciosSolicitados?: ServicioSolicitado[] | undefined;
  declare servicios?: Servicio[] | undefined;
  declare tarifas?: Tarifa[] | undefined;
  declare ocupaciones?: Ocupacion[] | undefined;
  declare imagenHabitacion?: ImagenHabitacion | undefined;
  declare tipoHabitacion?: TipoHabitacion | undefined;
  declare estadoHabitacion?: EstadoHabitacion | undefined;
  declare reservas?: Reserva[] | undefined;
}

HabitacionModel.init(Attributes, {
  sequelize,
  tableName: TableName,
  timestamps: false,
});

export { HabitacionModel };
export default { HabitacionModel };
