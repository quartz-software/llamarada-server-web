import { EstadoEmpleado } from "../../types/db/estado-empleado";

export type Entity = EstadoEmpleado;
export type Attributes = EstadoEmpleado;
export type CreationAttributes = Omit<EstadoEmpleado, "id">;
export const TableName = "estado-empleado";
