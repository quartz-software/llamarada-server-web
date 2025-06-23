import request from "supertest";
import app from "../../../app";
import { RolUsuario } from "../../../types/roles";

const tokens: Record<RolUsuario, string | null> = {
  administrador: null,
  recepcionista: null,
  limpieza: null,
  mantenimiento: null,
  cliente: null,
};

const credentials: Record<RolUsuario, { correo: string; password: string }> = {
  administrador: {
    correo: "admin1@email.com",
    password: "admin1pass",
  },
  recepcionista: {
    correo: "rec1@email.com",
    password: "rec1pass",
  },
  limpieza: {
    correo: "limp1@email.com",
    password: "limp1pass",
  },
  mantenimiento: {
    correo: "mant1@email.com",
    password: "mant1pass",
  },
  cliente: {
    correo: "clien1@email.com",
    password: "clien1pass",
  },
};
export const getAuthToken = async (rol: RolUsuario): Promise<string> => {
  if (tokens[rol]) return tokens[rol];

  const res = await request(app).post("/api/auth/login").send({
    correo: credentials[rol].correo,
    password: credentials[rol].password,
  });

  if (res.status !== 200 || !res.body.token) {
    throw new Error("No se pudo obtener el token de autenticación");
  }

  tokens[rol] = res.body.token;
  return tokens[rol]!;
};
