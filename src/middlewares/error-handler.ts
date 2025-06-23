import { NextFunction, Request, Response } from "express";
import env from "../config/env";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (env === "dev") {
    console.log(err);
    console.log(err.stack);
  }
  const status = err.status || 500;
  res.status(status);
  res.send();
};
