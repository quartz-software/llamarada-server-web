import { Tarifa } from "../../types/tarifa";

export type Entity = Tarifa;
export type Attributes = Tarifa;
export type CreationAttributes = Omit<Tarifa, "id">;
export const TableName = "tarifa";
