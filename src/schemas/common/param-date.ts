import { z } from "zod";

export const ParamDateSchema = z.object({
  startDate: z.string().date().optional(),
  endDate: z.string().date().optional(),
});
