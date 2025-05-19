import { PromocionServicio } from "../../types/promocion-servicio";

export type Entity = PromocionServicio;
export type Attributes = PromocionServicio;
export type CreationAttributes = Omit<PromocionServicio, "id">;
export const TableName = "promocion-servicio";
