import { AbastecimientoStock } from "../../types/abastecimiento-stock";

export type Entity = AbastecimientoStock;
export type Attributes = AbastecimientoStock;
export type CreationAttributes = Omit<AbastecimientoStock, "id">;
export const TableName = "abastecimiento-stock";
