import { NextFunction, Request, Response } from "express";
import { EmpleadoModel } from "../models/empleado/model";
import { getLimitParams } from "../utils/get-limit-params";
import { IdParamsSchema } from "../schemas/common/param-id";
import {
  EmpleadoCreateSchema,
  EmpleadoUpdateSchema,
} from "../schemas/models/empleado";

const EmpleadoController = {
  get: {
    "/": async (req: Request, res: Response, next: NextFunction) => {
      try {
        const limit = getLimitParams(req);
        if (limit === "error") {
          next({ status: 400 });
          return;
        }
        const users = await EmpleadoModel.findAll({
          limit: limit.q,
          offset: limit.pid * limit.q,
        });
        res.status(200).json(users.map((i) => i.toJSON()));
      } catch (e) {
        next(e);
      }
    },
    "/:id": async (req: Request, res: Response, next: NextFunction) => {
      try {
        const validateId = IdParamsSchema.safeParse(req.params.id);
        if (!validateId.success) {
          next({ status: 400 });
          return;
        }
        const employee = await EmpleadoModel.findByPk(validateId.data);
        if (!employee) {
          next({ status: 404 });
          return;
        }
        res.status(200).json(employee.toJSON());
      } catch (e) {
        next(e);
      }
    },
  },
  post: {
    "/": async (req: Request, res: Response, next: NextFunction) => {
      try {
        const validate = EmpleadoCreateSchema.safeParse(req.body);
        if (!validate.success) {
          next({ status: 400 });
          return;
        }
        const room = await EmpleadoModel.create(validate.data);
        res.status(201).json(room.toJSON());
      } catch (e) {
        next(e);
      }
    },
  },
  put: {
    "/:id": async (req: Request, res: Response, next: NextFunction) => {
      try {
        const validateId = IdParamsSchema.safeParse(Number(req.params.id));
        const validate = EmpleadoUpdateSchema.safeParse(req.body);
        if (!validateId.success || !validate.success) {
          next({ status: 400 });
          return;
        }
        await EmpleadoModel.update(validate.data, {
          where: { id: validateId.data },
        });
        res.status(204).send();
      } catch (error) {
        next(error);
      }
    },
  },
  delete: {
    "/:id": async (req: Request, res: Response, next: NextFunction) => {
      try {
        const validateId = IdParamsSchema.safeParse(Number(req.params.id));
        if (!validateId.success) {
          next({ status: 400 });
          return;
        }
        const rows = await EmpleadoModel.destroy({
          where: { id: validateId.data },
        });
        if (rows === 0) {
          next({ status: 404 });
          return;
        }
        res.status(204).send();
      } catch (error) {
        next(error);
      }
    },
  },
};

export default EmpleadoController;
export { EmpleadoController };
