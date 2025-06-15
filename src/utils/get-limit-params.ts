import { Request } from "express";
import { LimitParamsSchema } from "../schemas/common/param-limit";

export function getLimitParams(req: Request, q: number = 10, pid: number = 0) {
  const query = { pid: req.query.pid, q: req.query.q };
  const validateParams = LimitParamsSchema.safeParse(query);
  if (!validateParams.success) {
    return "error";
  }
  const limit = {
    pid,
    q,
  };
  limit.pid = validateParams.data.pid ?? limit.pid;
  limit.q = validateParams.data.q ?? limit.q;
  return limit;
}
