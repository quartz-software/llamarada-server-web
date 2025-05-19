import { Empleado } from "./empleado";

export interface TipoRol {
  id: number;
  nombre: "limpieza" | "mantenimiento" | "recepcionista" | "administrador";

  empleados?: Empleado[];
}
