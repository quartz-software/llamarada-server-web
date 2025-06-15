import { NextFunction, Request, Response } from "express";
import { sequelize } from "../models/";
import { ClienteModel } from "../models/cliente/model";
import { UsuarioModel } from "../models/usuario/model";
import { IdParamsSchema } from "../schemas/common/param-id";
import { UsuarioCreateSchema } from "../schemas/models/usuario";
import {
  ClienteCreateSchema,
  ClienteUpdateSchema,
} from "../schemas/models/cliente";
import { getLimitParams } from "../utils/get-limit-params";
const ClienteController = {
  get: {
    "/": async (req: Request, res: Response, next: NextFunction) => {
      try {
        const limit = getLimitParams(req);
        if (limit === "error") {
          next({ status: 400 });
          return;
        }

        const clients = await ClienteModel.findAll({
          include: { model: UsuarioModel, as: "usuario" },
          limit: limit.q,
          offset: limit.pid * limit.q,
        });
        res.status(200).json(clients.map((i) => i.toJSON()));
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

        const client = await ClienteModel.findByPk(validateId.data);
        if (!client) {
          next({ status: 404 });
          return;
        }
        res.status(200).json(client.toJSON());
      } catch (e) {
        next(e);
      }
    },
  },
  post: {
    "/": async (req: Request, res: Response, next: NextFunction) => {
      const transaction = await sequelize.transaction();
      try {
        const body = req.body;
        const validateUser = UsuarioCreateSchema.safeParse(body.user);
        const validateClient = ClienteCreateSchema.safeParse(body.client);
        if (!validateUser.success || !validateClient.success) {
          throw { status: 400 };
        }
        const newUser = await UsuarioModel.create(validateUser.data);
        validateClient.data.idUsuario = newUser.id;
        const newClient = await ClienteModel.create(validateClient.data);
        await transaction.commit();
        res
          .status(201)
          .json({ client: newClient.toJSON(), user: newUser.toJSON() });
      } catch (e) {
        await transaction.rollback();
        next(e);
      }
    },
  },
  put: {
    "/:id": async (req: Request, res: Response, next: NextFunction) => {
      try {
        const validateId = IdParamsSchema.safeParse(req.params.id);
        const validate = ClienteUpdateSchema.safeParse(req.body);
        if (!validateId.success || !validate.success) {
          next({ status: 400 });
          return;
        }
        await ClienteModel.update(validate.data, {
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
        const rows = await ClienteModel.destroy({
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

export default ClienteController;
export { ClienteController };
