import { ReservaHabitacion } from "../../types/db/reserva-habitacion";

export type Entity = ReservaHabitacion;
export type Attributes = ReservaHabitacion;
export type CreationAttributes = Omit<ReservaHabitacion, "id">;
export const TableName = "reserva-habitacion";
