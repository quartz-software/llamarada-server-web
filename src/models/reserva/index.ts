import { Reserva } from "../../types/db/reserva";

export type Entity = Reserva;
export type Attributes = Reserva;
export type CreationAttributes = Omit<Reserva, "id" | "createdAt">;
export const TableName = "reserva";
