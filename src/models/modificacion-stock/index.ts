import { ModificacionStock } from "../../types/modificacion-stock";

export type Entity = ModificacionStock;
export type Attributes = ModificacionStock;
export type CreationAttributes = Omit<ModificacionStock, "id">;
export const TableName = "modificacion-stock";
