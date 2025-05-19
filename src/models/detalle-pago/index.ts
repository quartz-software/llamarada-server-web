import { DetallePago } from "../../types/db/detalle-pago";

export type Entity = DetallePago;
export type Attributes = DetallePago;
export type CreationAttributes = Omit<DetallePago, "id">;
export const TableName = "detalle-pago";
