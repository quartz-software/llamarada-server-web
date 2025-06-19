import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log(err);
  // console.log(err.stack);
  const status = err.status || 500;
  res.status(status);
  res.send();
};
