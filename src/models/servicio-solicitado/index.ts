import { ServicioSolicitado } from "../../types/servicio-solicitado";

export type Entity = ServicioSolicitado;
export type Attributes = ServicioSolicitado;
export type CreationAttributes = Omit<ServicioSolicitado, "id" | "createdAt">;
export const TableName = "servicio-solicitado";
