import { Usuario } from "../../types/usuario";

export type Entity = Usuario;
export type Attributes = Usuario;
export type CreationAttributes = Omit<Usuario, "id">;
export const TableName = "usuario";
