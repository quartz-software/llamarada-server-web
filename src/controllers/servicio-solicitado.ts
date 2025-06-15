import { NextFunction, Request, Response } from "express";
import ServicioSolicitadoModel from "../models/servicio-solicitado/model";
import { getLimitParams } from "../utils/get-limit-params";
import { IdParamsSchema } from "../schemas/common/param-id";
import {
  ServicioSolicitadoCreateSchema,
  ServicioSolicitadoUpdateSchema,
} from "../schemas/models/servicio-solicitado";
const ServicioSolicitadoController = {
  get: {
    "/": async (req: Request, res: Response, next: NextFunction) => {
      try {
        const limit = getLimitParams(req);
        if (limit === "error") {
          next({ status: 400 });
          return;
        }
        const addServices = await ServicioSolicitadoModel.findAll({
          limit: limit.q,
          offset: limit.pid * limit.q,
          order: [["id", "ASC"]],
        });
        res.status(200).json(addServices.map((i) => i.toJSON()));
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
        const addService = await ServicioSolicitadoModel.findByPk(
          validateId.data
        );
        if (!addService) {
          next({ status: 404 });
          return;
        }
        res.status(200).json(addService.toJSON());
      } catch (e) {
        next(e);
      }
    },
  },
  post: {
    "/": async (req: Request, res: Response, next: NextFunction) => {
      try {
        const validate = ServicioSolicitadoCreateSchema.safeParse(req.body);
        if (!validate.success) {
          next({ status: 400 });
          return;
        }
        const addService = await ServicioSolicitadoModel.create(validate.data);
        res.status(201).json(addService.toJSON());
      } catch (e) {
        next(e);
      }
    },
  },
  put: {
    "/:id": async (req: Request, res: Response, next: NextFunction) => {
      try {
        const validateId = IdParamsSchema.safeParse(Number(req.params.id));
        const validateData = ServicioSolicitadoUpdateSchema.safeParse(req.body);
        if (!validateId.success || !validateData.success) {
          next({ status: 400 });
          return;
        }
        await ServicioSolicitadoModel.update(validateData.data, {
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
        await ServicioSolicitadoModel.destroy({
          where: { id: validateId.data },
        });
        res.status(204).send();
      } catch (e) {
        next(e);
      }
    },
  },
};

export default ServicioSolicitadoController;
export { ServicioSolicitadoController };
