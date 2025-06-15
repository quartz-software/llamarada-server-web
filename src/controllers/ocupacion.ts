import { NextFunction, Request, Response } from "express";
import { OcupacionModel } from "../models/ocupacion/model";
import { getLimitParams } from "../utils/get-limit-params";
import { IdParamsSchema } from "../schemas/common/param-id";
import { OcupacionUpdateSchema } from "../schemas/models/ocupacion";

const OcupacionController = {
  get: {
    "/": async (req: Request, res: Response, next: NextFunction) => {
      try {
        const limit = getLimitParams(req);
        if (limit === "error") {
          next({ status: 400, message: "" });
          return;
        }
        const roomAvailabilities = await OcupacionModel.findAll({
          order: [["id", "ASC"]],
          limit: limit.q,
          offset: limit.pid * limit.q,
        });
        res.status(200).json(roomAvailabilities);
      } catch (e) {
        next(e);
      }
    },

    "/:id": async (req: Request, res: Response, next: NextFunction) => {
      try {
        const validateId = IdParamsSchema.safeParse(Number(req.params.id));
        if (!validateId.success) {
          next({ status: 400, message: "" });
          return;
        }
        const roomAvailability = await OcupacionModel.findByPk(validateId.data);
        if (!roomAvailability) {
          next({ status: 404, message: "" });
          return;
        }

        res.status(200).json(roomAvailability);
      } catch (e) {
        next(e);
      }
    },
  },
  /* post: {
    "/": async (req: Request, res: Response, next: NextFunction) => {
      try {
        const validate = OcupacionCreateSchema.safeParse(req.body);
        if (!validate.success) {
          next({ status: 400, message: "" });
          return;
        }
        const roomAvailability = await OcupacionModel.create(validate.data);
        res.status(201).json(roomAvailability);
      } catch (e) {
        next(e)
      }
    },
  }, */
  put: {
    "/:id": async (req: Request, res: Response, next: NextFunction) => {
      try {
        const validateId = IdParamsSchema.safeParse(Number(req.params.id));
        const validate = OcupacionUpdateSchema.safeParse(req.body);
        if (!validateId.success || !validate.success) {
          next({ status: 400, message: "" });
          return;
        }

        await OcupacionModel.update(validate.data, {
          where: { id: validateId.data },
        });
        res.status(200).send();
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
          next({ status: 400, message: "" });
          return;
        }
        await OcupacionModel.destroy({ where: { id: validateId.data } });
        res.status(200).send();
      } catch (e) {
        next(e);
      }
    },
  },
};

export default OcupacionController;
export { OcupacionController };
