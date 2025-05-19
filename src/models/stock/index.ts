import { Stock } from "../../types/db/stock";

export type Entity = Stock;
export type Attributes = Stock;
export type CreationAttributes = Omit<Stock, "id">;
export const TableName = "stock";
