import { ImagenPDI } from "./imagen-pdi";

export type EstadosPDI = "limpio" | "sucio";
export interface EstadoPDI {
  id: number;
  nombre: EstadosPDI;

  imagenes?: ImagenPDI[];
}
