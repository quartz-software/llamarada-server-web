import { NextFunction, Request, Response } from "express";
import { getLimitParams } from "../utils/get-limit-params";
import { ImagenHabitacionModel } from "../models/imagen-habitacion/model";
import { IdParamsSchema } from "../schemas/common/param-id";
import {
  ImagenHabitacionCreateSchema,
  ImagenHabitacionUpdateSchema,
} from "../schemas/models/imagen-habitacion";

const ImagenHabitacionController = {
  get: {
    "/": async (req: Request, res: Response, next: NextFunction) => {
      try {
        const limit = getLimitParams(req);
        if (limit === "error") {
          next({ status: 400 });
          return;
        }
        const images = await ImagenHabitacionModel.findAll({
          order: [["id", "ASC"]],
          limit: limit.q,
          offset: limit.pid * limit.q,
        });
        res.status(200).json(images.map((i) => i.toJSON()));
      } catch (e) {
        next(e);
      }
    },
    "/:id": async (req: Request, res: Response, next: NextFunction) => {
      try {
        const validateId = IdParamsSchema.safeParse(Number(req.params.id));
        if (!validateId.success) {
          next({ status: 400 });
          return;
        }
        const image = await ImagenHabitacionModel.findByPk(validateId.data);
        if (!image) {
          next({ status: 404 });
          return;
        }

        res.status(200).json(image.toJSON());
      } catch (e) {
        next(e);
      }
    },
  },
  post: {
    "/": async (req: Request, res: Response, next: NextFunction) => {
      try {
        const validate = ImagenHabitacionCreateSchema.safeParse(req.body);
        if (!validate.success) {
          next({ status: 400 });
          return;
        }
        const image = await ImagenHabitacionModel.create(validate.data);
        res.status(201).json(image.toJSON());
      } catch (e) {
        next(e);
      }
    },
  },
  put: {
    "/:id": async (req: Request, res: Response, next: NextFunction) => {
      try {
        const validate = ImagenHabitacionUpdateSchema.safeParse(req.body);
        const validateId = IdParamsSchema.safeParse(Number(req.params.id));
        if (!validateId.success || !validate.success) {
          next({ status: 400 });
          return;
        }
        await ImagenHabitacionModel.update(validate.data, {
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
        const validateId = IdParamsSchema.safeParse(Number(req.params.id));
        if (!validateId.success) {
          next({ status: 400 });
          return;
        }
        const rows = await ImagenHabitacionModel.destroy({
          where: { id: validateId.data },
        });
        if (rows === 0) {
          next({ status: 404 });
          return;
        }
        res.status(204).send();
      } catch (e) {
        next(e);
      }
    },
  },
};

export default ImagenHabitacionController;
export { ImagenHabitacionController };
