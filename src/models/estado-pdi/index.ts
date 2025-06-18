import { EstadoPDI } from "../../types/db/estado-pdi";

export type Entity = EstadoPDI;
export type Attributes = EstadoPDI;
export type CreationAttributes = Omit<EstadoPDI, "id">;
export const TableName = "estado-pdi";
