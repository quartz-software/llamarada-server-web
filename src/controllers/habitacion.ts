import { HabitacionModel } from "../models/habitacion/model";
import { ImagenHabitacionModel } from "../models/imagen-habitacion/model";
import { sequelize } from "../models/index";
import { NextFunction, Request, Response } from "express";
import { ReservaModel } from "../models/reserva/model";
import {
  HabitacionCreateSchema,
  HabitacionUpdateSchema,
} from "../schemas/models/habitacion";
import path from "path";
import fs from "fs";
import { getLimitParams } from "../utils/get-limit-params";
import { IdParamsSchema } from "../schemas/common/param-id";
import { Transaction } from "sequelize";

const HabitacionController = {
  get: {
    // TODO si es cliente no mostrar habitaciones no disponibles
    "/": async (req: Request, res: Response, next: NextFunction) => {
      try {
        const limit = getLimitParams(req);
        if (limit === "error") {
          next({ status: 400 });
          return;
        }
        const rooms = await HabitacionModel.findAll({
          order: [["id", "ASC"]],
          limit: limit.q,
          offset: limit.q * limit.pid,
          include: [
            {
              model: ImagenHabitacionModel,
              as: "imagenHabitacion",
            },
            {
              model: ReservaModel,
              as: "reservas",
              through: { attributes: [] },
            },
          ],
        });
        res.status(200).json(rooms);
      } catch (e) {
        next(e);
      }
    },
    // TODO si es cliente no mostrar habitaciones no disponibles
    "/:id": async (req: Request, res: Response, next: NextFunction) => {
      try {
        const validateId = IdParamsSchema.safeParse(Number(req.params.id));
        if (!validateId.success) {
          next({ status: 400 });
          return;
        }

        const room = await HabitacionModel.findByPk(validateId.data, {
          include: {
            model: ImagenHabitacionModel,
            as: "imagenes",
          },
        });
        if (!room) {
          next({ status: 404 });
          return;
        }

        res.status(200).json(room);
      } catch (error) {
        next(error);
      }
    },
  },
  // TODO Validar mediante un esquema la entrada de imagenes, iamges = []
  post: {
    "/": async (req: Request, res: Response, next: NextFunction) => {
      let filenames: string[] = [];
      let transaction;

      try {
        transaction = await sequelize.transaction();
        const files = (req as any).files;
        const validate = HabitacionCreateSchema.safeParse(req.body);
        if (!validate.success) {
          throw { status: 400 };
        }
        const images: {
          name: string;
          type: "panoramica" | "3d" | "plano";
          index: number;
          url?: string;
        }[] = JSON.parse(req.body.images);

        const room = await HabitacionModel.create(validate.data, {
          transaction,
        });
        room.imagenes = [];
        images.forEach(async (item) => {
          room.imagenes!.push(
            await ImagenHabitacionModel.create({
              descripcion: item.name,
              tipoImagen: item.type,
              url: item.index
                ? "/uploads/images/" + files[item.index].filename
                : "",
              idHabitacion: room.id,
            })
          );
        });

        await transaction.commit();
        res.status(201).json(room);
      } catch (error) {
        if (transaction) {
          await transaction.rollback();
        }

        if (filenames.length > 0) {
          try {
            await Promise.all(
              filenames.map((filename) => {
                const filePath = path.join(
                  process.cwd(),
                  "uploads",
                  "images",
                  filename
                );
                return fs.unlink(filePath, () => {});
              })
            );
          } catch (deleteError) {
            console.log("Error deleting files:", deleteError);
          }
        }
        next(error);
      }
    },
  },
  put: {
    // TODO Validar mediante un esquema la entrada de imagenes, iamges = []
    "/:id": async (req: Request, res: Response, next: NextFunction) => {
      let transaction: Transaction | undefined = undefined;
      let filenames: string[] = [];
      try {
        transaction = await sequelize.transaction();
        const validateId = IdParamsSchema.safeParse(Number(req.params.id));
        const validate = HabitacionUpdateSchema.safeParse(req.body);
        if (!validate.success || !validateId.success) {
          throw { status: 400 };
        }

        const files = (req as any).files;
        const images: {
          name: string;
          type: "panoramica" | "3d" | "plano";
          index: number;
          url?: string;
        }[] = JSON.parse(req.body.images);

        const room = await HabitacionModel.findByPk(validateId.data, {
          include: {
            model: ImagenHabitacionModel,
            as: "imagenes",
          },
        });

        if (!room) {
          throw { status: 404 };
        }
        await room.update(validate.data, {
          where: { id: validateId },
          transaction,
        });

        // Gestionar imágenes: eliminar las existentes no incluidas en la solicitud
        const currentImageIds = room.imagenes!.map((image) => image.id);
        const newImageIds = images
          .filter((img) => img.index)
          .map((img) => img.index);

        const imagesToDelete = currentImageIds.filter(
          (id) => !newImageIds.includes(id)
        );
        await ImagenHabitacionModel.destroy({
          where: { id: imagesToDelete },
          transaction,
        });
        // Agregar o actualizar imágenes nuevas
        images.forEach(async (item) => {
          if (item.index == null) {
            room.imagenes!.push(
              await ImagenHabitacionModel.create(
                {
                  descripcion: item.name,
                  tipoImagen: item.type,
                  url: item.index
                    ? "/uploads/images/" + files[item.index].filename
                    : "",
                  idHabitacion: room.id,
                },
                { transaction }
              )
            );
          }
        });

        await transaction.commit();
        res.status(204).json(room);
      } catch (error) {
        if (transaction) {
          await transaction.rollback();
        }
        console.log("Error updating room:", error);
        if (filenames.length > 0) {
          try {
            await Promise.all(
              filenames.map((filename) => {
                const filePath = path.join(
                  process.cwd(),
                  "uploads",
                  "images",
                  filename
                );
                return fs.unlink(filePath, () => {});
              })
            );
          } catch (deleteError) {
            console.log("Error deleting files:", deleteError);
          }
        }
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
        await HabitacionModel.destroy({ where: { id: validateId.data } });
        res.status(204).send();
      } catch (error) {
        next(error);
      }
    },
  },
};

export { HabitacionController };
