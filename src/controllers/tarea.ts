import { NextFunction, Request, Response } from "express";
import { getLimitParams } from "../utils/get-limit-params";
import { z } from "zod";
import { FindOptions } from "sequelize";
import { Tarea } from "../types/db/tarea";
import { TareaModel } from "../models/tarea/model";
import { IdParamsSchema } from "../schemas/common/param-id";
import { TareaCreateSchema, TareaUpdateSchema } from "../schemas/models/tarea";

const TareaController = {
  get: {
    "/": async (req: Request, res: Response, next: NextFunction) => {
      try {
        const limit = getLimitParams(req);
        if (limit === "error") {
          next({ status: 400 });
          return;
        }
        const validateQuery = z.coerce
          .number()
          .int()
          .min(1)
          .optional()
          .safeParse(req.body.status);

        const options: FindOptions<Tarea> = {
          limit: limit.q,
          offset: limit.pid * limit.q,
          order: [
            ["idEstado", "ASC"],
            ["createdAt", "ASC"],
          ],
        };
        if (validateQuery.data)
          options.where = {
            idEstado: validateQuery.data,
          };
        const tasks = await TareaModel.findAll(options);
        res.status(200).json(tasks.map((i) => i.toJSON()));
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
        const task = await TareaModel.findByPk(validateId.data);
        if (!task) {
          next({ status: 404 });
          return;
        }
        res.status(200).json(task.toJSON());
      } catch (e) {
        next(e);
      }
    },
  },
  post: {
    "/": async (req: Request, res: Response, next: NextFunction) => {
      try {
        const validateData = TareaCreateSchema.safeParse(req.body);
        if (!validateData.success) {
          next({ status: 400 });
          return;
        }
        const task = await TareaModel.create(validateData.data);
        res.status(201).json(task.toJSON());
      } catch (e) {
        next(e);
      }
    },
  },
  put: {
    "/:id": async (req: Request, res: Response, next: NextFunction) => {
      try {
        const validateId = IdParamsSchema.safeParse(Number(req.params.id));
        const validateData = TareaUpdateSchema.safeParse(req.body);
        if (!validateId.success || !validateData.success) {
          next({ status: 400 });
          return;
        }
        await TareaModel.update(validateData.data, {
          where: { id: validateId.data },
        });
        res.status(204).send();
      } catch (e) {
        next(e);
      }
    },
  },
  delete: {
    "/:id": async (req: Request, res: Response, next: NextFunction) => {
      try {
        const validateId = IdParamsSchema.safeParse(req.params.id);
        if (!validateId.success) {
          next({ status: 400 });
          return;
        }
        await TareaModel.destroy({ where: { id: validateId.data } });
        res.status(204).send();
      } catch (e) {
        next(e);
      }
    },
  },
};

export default TareaController;
export { TareaController };
