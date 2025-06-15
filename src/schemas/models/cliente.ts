import { z } from "zod";

export const ClienteCreateSchema = z.object({
  dni: z.string(),
  nombre1: z.string(),
  nombre2: z.string().optional(),
  apellido1: z.string(),
  apellido2: z.string().optional(),
  telefono: z.string().optional(),
  pais: z.string(),
  idUsuario: z.number(),
});

export const ClienteUpdateSchema = ClienteCreateSchema.partial();

export const ClienteSchema = ClienteCreateSchema.extend({
  id: z.number(),
});
