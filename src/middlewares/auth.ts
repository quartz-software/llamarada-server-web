import { NextFunction, Request, Response } from "express";
import { validateToken } from "../utils/auth";

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token =
      req.headers.authorization?.split(" ")[1] || req.cookies["token"];
    if (!token) {
      res.status(401).json({ message: "token requerido" });
      return;
    }

    let payload = await validateToken(token);
    if (!payload) {
      res.status(401).json({ message: "token invalido" });
      return;
    }
    (req as any).user = payload;
    next();
  } catch (e) {
    next(e);
  }
}
