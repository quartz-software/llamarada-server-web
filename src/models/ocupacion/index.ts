import { Ocupacion } from "../../types/db/ocupacion";

export type Entity = Ocupacion;
export type Attributes = Ocupacion;
export type CreationAttributes = Omit<Ocupacion, "id">;
export const TableName = "ocupacion";
