import { EstadoTarea } from "../../types/estado-tarea";

export type Entity = EstadoTarea;
export type Attributes = EstadoTarea;
export type CreationAttributes = Omit<EstadoTarea, "id">;
export const TableName = "estado-tarea";
