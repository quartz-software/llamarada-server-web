import { z } from "zod";

export const TareaCreateSchema = z.object({
  idEstado: z.number(),
  idEmpleado: z.number(),
  idServicio: z.number(),
  descripcion: z.string(),
  observaciones: z.string().optional(),
  fechaInicio: z.coerce.date(),
  fechaCompletado: z.coerce.date().optional(),
});

export const TareaUpdateSchema = TareaCreateSchema.partial();

export const TareaSchema = TareaCreateSchema.extend({
  id: z.number(),
});
