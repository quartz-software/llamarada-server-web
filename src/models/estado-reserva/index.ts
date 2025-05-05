import { EstadoReserva } from "../../types/estado-reserva";

export type Entity = EstadoReserva;
export type Attributes = EstadoReserva;
export type CreationAttributes = Omit<EstadoReserva, "id">;
export const TableName = "estado-reserva";
