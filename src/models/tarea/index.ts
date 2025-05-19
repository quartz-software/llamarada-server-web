import { Tarea } from "../../types/db/tarea";

export type Entity = Tarea;
export type Attributes = Tarea;
export type CreationAttributes = Omit<Tarea, "id" | "createdAt">;
export const TableName = "tarea";
