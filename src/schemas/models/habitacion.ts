import { z } from "zod";

export const HabitacionCreateSchema = z.object({
  numeroHabitacion: z.string(),
  capacidad: z.number(),
  descripcion: z.string().optional(),
  idEstadoHabitacion: z.number(),
  idTipoHabitacion: z.number(),
});

export const HabitacionUpdateSchema = HabitacionCreateSchema.partial();

export const HabitacionSchema = HabitacionCreateSchema.extend({
  id: z.number(),
});
