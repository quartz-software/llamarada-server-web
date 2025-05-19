import { Empleado } from "../../types/db/empleado";

export type Entity = Empleado;
export type Attributes = Empleado;
export type CreationAttributes = Omit<Empleado, "id">;
export const TableName = "empleado";
