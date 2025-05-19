import { TipoServicio } from "../../types/tipo-servicio";

export type Entity = TipoServicio;
export type Attributes = TipoServicio;
export type CreationAttributes = Omit<TipoServicio, "id">;
export const TableName = "tipo-servicio";
