import { ImagenHabitacion } from "./db/imagen-habitacion";
import { Ocupacion } from "./db/ocupacion";
import { Servicio } from "./db/servicio";
import { ServicioSolicitado } from "./db/servicio-solicitado";
import { Tarifa } from "./db/tarifa";
import { TipoHabitacion } from "./db/tipo-habitacion";

export interface Habitacion {
  id: number;
  numeroHabitacion: string;
  capacidad: number;
  descripcion?: string;
  idEstadoHabitacion: number;
  idTipoHabitacion: number;

  serviciosSolicitados?: ServicioSolicitado[];
  servicios?: Servicio[];
  tarifas?: Tarifa[];
  ocupaciones?: Ocupacion[];
  imagenHabitacion?: ImagenHabitacion;
  tipoHabitacion?: TipoHabitacion;
}
