import { Tarea } from "./tarea";

export interface EstadoTarea {
  id: number;
  nombre: string;

  tareas?: Tarea[];
}
