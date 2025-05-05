import { Pago } from "../../types/pago";

export type Entity = Pago;
export type Attributes = Pago;
export type CreationAttributes = Omit<Pago, "id">;
export const TableName = "pago";
