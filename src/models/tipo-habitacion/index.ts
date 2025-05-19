import { TipoHabitacion } from "../../types/tipo-habitacion";

export type Entity = TipoHabitacion;
export type Attributes = TipoHabitacion;
export type CreationAttributes = Omit<TipoHabitacion, "id">;
export const TableName = "tipo-habitacion";
