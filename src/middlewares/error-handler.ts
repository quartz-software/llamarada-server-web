import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  console.log(err.stack);
  const status = err.status || 500;
  const message = status === 500 ? err.message : "Internal server error";
  res.status(status);
  if (message) {
    res.json({ error: message });
  } else {
    res.send();
  }
};
