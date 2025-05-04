import { Cliente } from "../../types/cliente";

export type Entity = Cliente;
export type Attributes = Cliente;
export type CreationAttributes = Omit<Cliente, "id">;
export const TableName = "cliente";
