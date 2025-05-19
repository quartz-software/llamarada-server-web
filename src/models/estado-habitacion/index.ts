import { EstadoHabitacion } from "../../types/db/estado-habitacion";

export type Entity = EstadoHabitacion;
export type Attributes = EstadoHabitacion;
export type CreationAttributes = Omit<EstadoHabitacion, "id">;
export const TableName = "estado-habitacion";
