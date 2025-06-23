import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appConfig from "../config/app";
import { Usuario } from "../types/db/usuario";
import { RolUsuario } from "../types/roles";
import { Request } from "express";
import { UsuarioModel } from "../models/usuario/model";
import { ClienteModel } from "../models/cliente/model";
import { EmpleadoModel } from "../models/empleado/model";
import { TipoRolModel } from "../models/tipo-rol/model";
import { EstadoEmpleadoModel } from "../models/estado-empleado/model";

interface UserRequest {
  id: number;
  rol: RolUsuario;
  estado?: undefined | "activo" | "inactivo" | "entrenamiento" | "despedido";
}

function getUserRequest(req: Request): UserRequest {
  return (req as any).user as UserRequest;
}

async function encryptPassword(password: string): Promise<string> {
  const rounds = bcrypt.genSaltSync();
  const encryptedPassword = await bcrypt.hash(password, rounds);
  return encryptedPassword;
}

async function validatePassword(
  password: string,
  userModel: Usuario
): Promise<boolean> {
  const isValid = await bcrypt.compare(password, userModel.password);
  return isValid;
}

async function createToken(userId: number): Promise<string> {
  const user = await UsuarioModel.findOne({
    where: { id: userId },
    include: [
      {
        model: ClienteModel,
        as: "cliente",
      },
      {
        model: EmpleadoModel,
        as: "empleado",
        attributes: ["idEstado", "idRol"],
        include: [
          {
            model: EstadoEmpleadoModel,
            as: "estado",
            attributes: ["nombre"],
          },
          {
            model: TipoRolModel,
            as: "rol",
            attributes: ["nombre"],
          },
        ],
      },
    ],
  });
  const rol: RolUsuario = user?.empleado?.rol?.nombre ?? "cliente";
  const estado = user?.empleado?.estado?.nombre;
  let payload: UserRequest = { id: userId, rol, estado };
  let token: string;
  token = jwt.sign(payload, appConfig.secret);
  return token;
}

async function validateToken(token: string): Promise<UserRequest> {
  const payload = jwt.verify(token, appConfig.secret);
  return payload as UserRequest;
}

export default {
  validatePassword,
  encryptPassword,
  validateToken,
  createToken,
  getUserRequest,
};
export {
  getUserRequest,
  validatePassword,
  encryptPassword,
  validateToken,
  createToken,
};
