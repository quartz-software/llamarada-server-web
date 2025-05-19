import { Cliente } from "./cliente";
import { Empleado } from "./empleado";

export interface Usuario {
  id: number;
  correo: string;
  password: string;

  empleados?: Empleado[];
  clientes?: Cliente[];
}
