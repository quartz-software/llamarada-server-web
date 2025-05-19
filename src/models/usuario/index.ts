import { Usuario } from "../../types/db/usuario";

export type Entity = Usuario;
export type Attributes = Usuario;
export type CreationAttributes = Omit<Usuario, "id">;
export const TableName = "usuario";
