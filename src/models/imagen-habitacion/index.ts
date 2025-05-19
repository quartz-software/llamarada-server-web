import { ImagenHabitacion } from "../../types/db/imagen-habitacion";

export type Entity = ImagenHabitacion;
export type Attributes = ImagenHabitacion;
export type CreationAttributes = Omit<ImagenHabitacion, "id">;
export const TableName = "imagen-habitacion";
