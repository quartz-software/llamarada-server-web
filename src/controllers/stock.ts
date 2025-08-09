import { NextFunction, Request, Response } from "express";
import { StockModel } from "../models/stock/model";
import { getLimitParams } from "../utils/get-limit-params";
import { IdParamsSchema } from "../schemas/common/param-id";
import { StockCreateSchema, StockUpdateSchema } from "../schemas/models/stock";

const StockController = {
  get: {
    "/": async (req: Request, res: Response, next: NextFunction) => {
      try {
        const limit = getLimitParams(req);
        if (limit === "error") {
          next({ status: 400 });
          return;
        }
        const stock = await StockModel.findAll({
          limit: limit.q,
          offset: limit.pid * limit.q,
          order: [["id", "ASC"]],
        });
        res.status(200).json(stock.map((i) => i.toJSON()));
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

        const item = await StockModel.findByPk(validateId.data);
        if (!item) {
          next({ status: 404 });
          return;
        }

        res.status(200).json(item);
      } catch (e) {
        next(e);
      }
    },
  },
  post: {
    "/": async (req: Request, res: Response, next: NextFunction) => {
      try {
        const validateData = StockCreateSchema.safeParse(req.body);
        if (!validateData.success) {
          next({ status: 400 });
          return;
        }
        const stock = await StockModel.create(validateData.data);
        res.status(201).json(stock);
      } catch (e) {
        next(e);
      }
    },
  },
  put: {
    "/:id": async (req: Request, res: Response, next: NextFunction) => {
      try {
        const validateId = IdParamsSchema.safeParse(req.params.id);
        const validateData = StockUpdateSchema.safeParse(req.body);
        if (!validateId.success || !validateData.success) {
          next({ status: 400 });
          return;
        }

        await StockModel.update(validateData.data, {
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
        await StockModel.destroy({ where: { id: validateId.data } });
        res.status(204).send();
      } catch (e) {
        next(e);
      }
    },
  },
};

export default StockController;
export { StockController };
