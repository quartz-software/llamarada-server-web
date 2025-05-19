import { EstadoServicioSolicitado } from "../../types/db/estado-servicio-solicitado";

export type Entity = EstadoServicioSolicitado;
export type Attributes = EstadoServicioSolicitado;
export type CreationAttributes = Omit<EstadoServicioSolicitado, "id">;
export const TableName = "estado-servicio-solicitado";
