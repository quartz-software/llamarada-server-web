import { TipoRol } from "../../types/db/tipo-rol";

export type Entity = TipoRol;
export type Attributes = TipoRol;
export type CreationAttributes = Omit<TipoRol, "id">;
export const TableName = "tipo-rol";
