import { NextFunction, Request, Response } from "express";
import isEqual from "../utils/is-equal";
import { getLimitParams } from "../utils/get-limit-params";
import { FindOptions } from "sequelize";
import { Servicio } from "../types/db/servicio";
import { ServicioModel } from "../models/servicio/model";
import { IdParamsSchema } from "../schemas/common/param-id";
import {
  ServicioCreateSchema,
  ServicioUpdateSchema,
} from "../schemas/models/servicio";

const ServicioController = {
  get: {
    "/": async (req: Request, res: Response, next: NextFunction) => {
      try {
        const limit = getLimitParams(req);
        if (limit === "error") {
          next({ status: 400 });
          return;
        }
        const options: FindOptions<Servicio> = {
          limit: limit.q,
          offset: limit.pid * limit.q,
          where: {
            disponible: true,
          },
        };
        const user = (req as any).user;
        if (!user) {
          next({ status: 403 });
          return;
        }

        if (!isEqual(user.rol, "admin")) {
          options.where = {
            disponible: false,
          };
        }
        let services = await ServicioModel.findAll(options);

        res.status(200).json(services.map((i) => i.toJSON()));
      } catch (error) {
        next(error);
      }
    },
    "/:id": async (req: Request, res: Response, next: NextFunction) => {
      try {
        const user = (req as any).user;
        const validateId = IdParamsSchema.safeParse(Number(req.params.id));
        if (!validateId.success) {
          next({ status: 400 });
          return;
        }

        const servicio = await ServicioModel.findByPk(validateId.data);
        if (!servicio) {
          next({ status: 404 });
          return;
        }
        if (!servicio.disponible && !isEqual(user.role, "admin")) {
          next({ status: 403 });
          return;
        }

        res.status(200).json(servicio.toJSON());
      } catch (error) {
        next(error);
      }
    },
  },
  post: {
    "/": async (req: Request, res: Response, next: NextFunction) => {
      try {
        const validate = ServicioCreateSchema.safeParse(req.body);
        if (!validate.success) {
          next({ status: 400 });
          return;
        }

        const service = await ServicioModel.create(validate.data);
        res.status(201).json(service.toJSON());
      } catch (error) {
        next(error);
      }
    },
  },
  put: {
    "/:id": async (req: Request, res: Response, next: NextFunction) => {
      try {
        const validateId = IdParamsSchema.safeParse(req.params.id);
        const validateData = ServicioUpdateSchema.safeParse(req.body);
        if (!validateId.success || !validateData.success) {
          next({ status: 400 });
          return;
        }
        await ServicioModel.update(validateData.data, {
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
        await ServicioModel.destroy({ where: { id: validateId.data } });
        res.status(204).send();
      } catch (e) {
        next(e);
      }
    },
  },
};

export default ServicioController;
export { ServicioController };
