import { TipoServicio } from "../../types/db/tipo-servicio";

export type Entity = TipoServicio;
export type Attributes = TipoServicio;
export type CreationAttributes = Omit<TipoServicio, "id">;
export const TableName = "tipo-servicio";
