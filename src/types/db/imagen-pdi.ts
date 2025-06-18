import { Habitacion } from "./habitacion";
import { EstadoPDI } from "./estado-pdi";

export interface ImagenPDI {
  id: number;
  url: string;
  idEstado: number;
  idHabitacion: number;
  habitacion?: Habitacion;
  estado?: EstadoPDI;
}
