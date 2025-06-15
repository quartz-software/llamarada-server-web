import { NextFunction, Request, Response } from "express";
import isEqual from "../utils/is-equal";
import { RolUsuario } from "../types/roles";

export default (...permisos: RolUsuario[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user || !isEqual(user.rol, ...permisos)) {
      next({ status: 403 });
      return;
    }
    next();
  };
};
