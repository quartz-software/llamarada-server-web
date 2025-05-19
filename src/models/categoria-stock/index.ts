import { CategoriaStock } from "../../types/db/categoria-stock";

export type Entity = CategoriaStock;
export type Attributes = CategoriaStock;
export type CreationAttributes = Omit<CategoriaStock, "id">;
export const TableName = "categoria-stock";
