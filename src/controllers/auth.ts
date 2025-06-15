import {
  validatePassword,
  createToken,
  encryptPassword,
  validateToken,
  getUserRequest,
} from "../utils/auth";
import isEqual from "../utils/is-equal";
import { NextFunction, Request, Response } from "express";
import {
  UsuarioCreateSchema,
  UsuarioLoginSchema,
} from "../schemas/models/usuario";
import { UsuarioModel } from "../models/usuario/model";
import { EmpleadoModel } from "../models/empleado/model";
import { TipoRolModel } from "../models/tipo-rol/model";
import { ClienteModel } from "../models/cliente/model";
import { ClienteCreateSchema } from "../schemas/models/cliente";
import { Transaction } from "sequelize";
import sequelize from "../models";

const ClientePublicSchema = ClienteCreateSchema.omit({ idUsuario: true });
const AuthController = {
  get: {
    // Devuelve el rol del empleado, esta restricto a empleados
    "/role": async (req: Request, res: Response, next: NextFunction) => {
      try {
        const user = getUserRequest(req);
        const actUser = await UsuarioModel.findByPk(user.id, {
          include: {
            model: EmpleadoModel,
            as: "empleado",
            attributes: ["idRol"],
            include: [
              {
                model: TipoRolModel,
                attributes: ["nombre"],
                as: "rol",
              },
            ],
          },
        });
        const rol = actUser?.cliente
          ? "cliente"
          : actUser?.empleado?.rol?.nombre;
        if (!rol) throw new Error("El usuario no tiene rol");
        res.status(200).json(rol);
      } catch (e) {
        next(e);
      }
    },
    // Checkea si el token es valido y devuelve true o false
    "/check": async (req: Request, res: Response, next: NextFunction) => {
      try {
        const token =
          req.headers.authorization?.split(" ")[1] || req.cookies["token"];
        if (!token) {
          res.clearCookie("token").status(200).json({ valid: false });
          return;
        }

        let valid = await validateToken(token);
        if (!valid) {
          res.clearCookie("token").status(200).json({ valid: false });
          return;
        }

        res.clearCookie("token").status(200).json({ valid: true });
      } catch (e: any) {
        if (
          isEqual(
            e.name,
            "TokenExpiredError",
            "JsonWebTokenError",
            "NotBeforeError"
          )
        ) {
          res.clearCookie("token").status(200).json({ valid: false });
          return;
        }

        next(e);
      }
    },
  },
  // Endpoint para registro de clientes, no se usa por la administracion
  post: {
    "/register": async (req: Request, res: Response, next: NextFunction) => {
      let transaction: Transaction | undefined = undefined;
      try {
        transaction = await sequelize.transaction();
        let validateUsuario = UsuarioCreateSchema.safeParse(req.body.usuario);
        let validateCliente = ClientePublicSchema.safeParse(req.body.cliente);
        if (!validateUsuario.success || !validateCliente.success) {
          throw { status: 400 };
        }
        let user = await UsuarioModel.findOne({
          where: { correo: validateUsuario.data?.correo },
        });
        // Si el usuario existe, no puede registrar un nuevo
        if (user) {
          throw { status: 409, message: "usuario existente" };
        }
        const correo = validateUsuario.data.correo;
        const password = await encryptPassword(validateUsuario.data.password);
        const newUser = await UsuarioModel.create(
          {
            correo,
            password,
          },
          { transaction }
        );

        await ClienteModel.create(
          {
            ...validateCliente.data,
            idUsuario: newUser.id,
          },
          { transaction }
        );

        const token = await createToken(newUser.id);
        await transaction.commit();
        res.cookie("token", token).status(200).json({ token: token });
      } catch (error) {
        if (transaction) {
          await transaction.rollback();
        }
        next(error);
      }
    },
    "/login": async (req: Request, res: Response, next: NextFunction) => {
      try {
        const validate = UsuarioLoginSchema.safeParse(req.body);
        if (!validate.success) {
          next({ status: 400 });
          return;
        }

        const user = await UsuarioModel.findOne({
          where: { correo: validate.data.correo },
        });
        if (!user) {
          next({ status: 401 });
          return;
        }
        const validPassword = await validatePassword(
          validate.data.password,
          user
        );
        if (!validPassword) {
          next({ status: 401 });
          return;
        }

        const token = await createToken(user.id);
        res.cookie("token", token).status(200).json({ token: token });
      } catch (e) {
        next(e);
      }
    },
    // TODO, usar una blacklist para validar
    "/logout": async (req: Request, res: Response, next: NextFunction) => {
      try {
        res.clearCookie("token").status(200).send();
      } catch (e) {
        next(e);
      }
    },
  },
};

export default AuthController;
export { AuthController };
