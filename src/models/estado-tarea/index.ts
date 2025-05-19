import { EstadoTarea } from "../../types/db/estado-tarea";

export type Entity = EstadoTarea;
export type Attributes = EstadoTarea;
export type CreationAttributes = Omit<EstadoTarea, "id">;
export const TableName = "estado-tarea";
