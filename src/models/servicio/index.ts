import { Servicio } from "../../types/servicio";

export type Entity = Servicio;
export type Attributes = Servicio;
export type CreationAttributes = Omit<Servicio, "id">;
export const TableName = "servicio";
