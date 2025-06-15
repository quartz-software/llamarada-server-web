import { z } from "zod";

export const ReservaCreateSchema = z.object({
  numAdultos: z.number(),
  numNinos: z.number(),
  checkIn: z.coerce.date(),
  checkOut: z.coerce.date(),
  checkOutReal: z.coerce.date().optional(),
  precioTotal: z.number().optional(),
  origenReserva: z.enum(["web", "system"]),
  createdAt: z.coerce.date(),
});

export const ReservaUpdateSchema = ReservaCreateSchema.partial();

export const ReservaSchema = ReservaCreateSchema.extend({
  id: z.number(),
});
