import { Habitacion } from "../../types/db/habitacion";

export type Entity = Habitacion;
export type Attributes = Habitacion;
export type CreationAttributes = Omit<Habitacion, "id">;
export const TableName = "habitacion";
