import { NextFunction, Request, Response } from "express";
import { TarifaModel } from "../models/tarifa/model";
import { getLimitParams } from "../utils/get-limit-params";
import { IdParamsSchema } from "../schemas/common/param-id";
import { HabitacionModel } from "../models/habitacion/model";
import sequelize from "../models";
import { Op, Transaction } from "sequelize";
import {
  TarifaCreateSchema,
  TarifaUpdateSchema,
} from "../schemas/models/tarifa";
import { TarifaHabitacionModel } from "../models/tarifa-habitacion/model";
import { TarifaHabitacion } from "../types/db/tarifa-habitacion";
import { z } from "zod";

const TarifaController = {
  get: {
    "/": async (req: Request, res: Response, next: NextFunction) => {
      try {
        const limit = getLimitParams(req);
        if (limit === "error") {
          next({ status: 400 });
          return;
        }
        const rates = await TarifaModel.findAll({
          limit: limit.q,
          offset: limit.pid * limit.q,
          order: [["id", "ASC"]],
        });
        res.status(200).json(rates.map((i) => i.toJSON()));
      } catch (error) {
        next(error);
      }
    },
    "/:id": async (req: Request, res: Response, next: NextFunction) => {
      try {
        const validateId = IdParamsSchema.safeParse(req.params.id);
        if (!validateId.success) {
          next({ status: 400 });
          return;
        }

        const tarifa = await TarifaModel.findByPk(validateId.data, {
          include: {
            model: HabitacionModel,
            as: "habitaciones",
            through: { attributes: [] },
          },
        });
        if (!tarifa) {
          next({ status: 404 });
          return;
        }
        res.status(200).json(tarifa.toJSON());
      } catch (error) {
        next(error);
      }
    },
  },
  post: {
    "/": async (req: Request, res: Response, next: NextFunction) => {
      let transaction: Transaction | undefined = undefined;
      try {
        transaction = await sequelize.transaction();
        const validate = TarifaCreateSchema.extend({
          rooms: z.array(z.number().int().positive()),
        }).safeParse(req.body);
        if (!validate.success) {
          throw { status: 400 };
        }

        const newTarifa = await TarifaModel.create(validate.data, {
          transaction,
        });
        const tarifaId = newTarifa.id;

        const relationData = validate.data.rooms.map(
          (id): TarifaHabitacion => ({
            idHabitacion: id,
            idTarifa: tarifaId,
          })
        );
        await TarifaHabitacionModel.bulkCreate(relationData, { transaction });
        await transaction.commit();
        res.status(201).json(newTarifa);
      } catch (error) {
        if (transaction) {
          await transaction.rollback();
        }
        next(error);
      }
    },
  },
  put: {
    "/:id": async (req: Request, res: Response, next: NextFunction) => {
      let transaction: Transaction | undefined = undefined;
      try {
        transaction = await sequelize.transaction();
        const validateId = IdParamsSchema.safeParse(Number(req.params.id));
        const validateData = TarifaUpdateSchema.extend({
          rooms: z.array(z.number().int().positive()),
        }).safeParse(req.body);
        if (!validateId.success || !validateData.success) {
          next({ status: 400 });
          return;
        }

        await TarifaModel.update(validateData.data, {
          where: { id: validateId.data },
          transaction,
        });

        await TarifaHabitacionModel.destroy({
          where: {
            idTarifa: validateId.data,
            idHabitacion: {
              [Op.notIn]: validateData.data.rooms,
            },
          },
          transaction,
        });

        await transaction.commit();
        res.status(204).send();
      } catch (error) {
        if (transaction) await transaction.rollback();
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

        const deleted = await TarifaModel.destroy({
          where: { id: validateId.data },
        });
        if (deleted === 0) {
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

export default TarifaController;
export { TarifaController };
