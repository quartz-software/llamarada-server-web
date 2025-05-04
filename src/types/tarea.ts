import { Empleado } from "./empleado";
import { EstadoTarea } from "./estado-tarea";
import { Servicio } from "./servicio";

export interface Tarea {
  id: number;
  idEstado: number;
  idEmpleado: number;
  idServicio: number;
  descripcion: string;
  observaciones?: string;
  fechaInicio: Date;
  fechaCompletado?: Date;
  createdAt: Date;

  estado?: EstadoTarea;
  servicio?: Servicio;
  empleado?: Empleado;
}
