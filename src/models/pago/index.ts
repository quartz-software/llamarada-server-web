import { Pago } from "../../types/db/pago";

export type Entity = Pago;
export type Attributes = Pago;
export type CreationAttributes = Omit<Pago, "id">;
export const TableName = "pago";
