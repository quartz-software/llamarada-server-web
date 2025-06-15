import { Model } from "sequelize";
import { sequelize } from "../index";
import Attributes from "./attributes";
import { Attributes as Attr, CreationAttributes, Entity, TableName } from ".";
import { EstadoHabitacion } from "../../types/db/estado-habitacion";
import { ImagenHabitacion } from "../../types/db/imagen-habitacion";
import { Ocupacion } from "../../types/db/ocupacion";
import { Reserva } from "../../types/db/reserva";
import { Servicio } from "../../types/db/servicio";
import { ServicioSolicitado } from "../../types/db/servicio-solicitado";
import { Tarifa } from "../../types/db/tarifa";
import { TipoHabitacion } from "../../types/db/tipo-habitacion";

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
  declare imagenes?: ImagenHabitacion[] | undefined;
  declare tipo?: TipoHabitacion | undefined;
  declare estado?: EstadoHabitacion | undefined;
  declare reservas?: Reserva[] | undefined;
}

HabitacionModel.init(Attributes, {
  sequelize,
  tableName: TableName,
  timestamps: false,
});

export { HabitacionModel };
export default { HabitacionModel };
