import { ImagenPDI } from "../../types/db/imagen-pdi";

export type Entity = ImagenPDI;
export type Attributes = ImagenPDI;
export type CreationAttributes = Omit<ImagenPDI, "id">;
export const TableName = "imagen-pdi";
