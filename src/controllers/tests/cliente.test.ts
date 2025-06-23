import request from "supertest";
import app from "../../app";
import { getAuthToken } from "./utils/tokens";

const base = "/api/clients";
describe("ClienteController - endpoints protegidos (rol: administrador)", () => {
  let adminToken: string;

  beforeAll(async () => {
    adminToken = await getAuthToken("administrador");
  });

  describe("GET /", () => {
    it("debe rechazar acceso si no hay token", async () => {
      const res = await request(app).get(base + "/");
      expect(res.status).toBe(401);
    });

    it("debe retornar lista de clientes", async () => {
      const res = await request(app)
        .get(base + "/?pid=0&q=10")
        .set("Authorization", `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it("debe retornar errores si params inválidos", async () => {
      const res = await request(app)
        .get(base + "/?pid=abc&q=xyz")
        .set("Authorization", `Bearer ${adminToken}`);

      expect(res.status).toBe(400);
    });
  });

  describe("GET /:id", () => {
    it("debe generar error 400 si id inválido", async () => {
      const res = await request(app)
        .get(base + "/not-a-number")
        .set("Authorization", `Bearer ${adminToken}`);

      expect(res.status).toBe(400);
    });

    it("debe retornar 404 si cliente no existe", async () => {
      const res = await request(app)
        .get(base + "/999999")
        .set("Authorization", `Bearer ${adminToken}`);

      expect(res.status).toBe(404);
    });

    it("debe retornar cliente si existe", async () => {
      const res = await request(app)
        .get(base + "/1")
        .set("Authorization", `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("id", "1");
    });
  });

  describe("POST /", () => {
    it("debe retornar 400 si payload inválido", async () => {
      const res = await request(app)
        .post(base + "/")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ client: {}, user: {} });

      expect(res.status).toBe(400);
    });

    it("debe crear cliente válido (201)", async () => {
      const payload = {
        usuario: {
          correo: "john.doe@example.com",
          password: "Password1234",
        },
        cliente: {
          nombre1: "John",
          nombre2: "Michael",
          apellido1: "Doe",
          apellido2: "Smith",
          telefono: "+1234567890",
          dni: "DNI123456",
          pais: "BO",
        },
      };

      const res = await request(app)
        .post(base + "/")
        .set("Authorization", `Bearer ${adminToken}`)
        .send(payload);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("usuario");
      expect(res.body).toHaveProperty("cliente");
      expect(res.body.cliente).toMatchObject({
        dni: payload.cliente.dni,
        nombre1: payload.cliente.nombre1,
        apellido1: payload.cliente.apellido1,
      });
    });
  });

  describe("PUT /:id", () => {
    it("debe retornar 400 si id o body inválido", async () => {
      const res = await request(app)
        .put(base + "/not-id")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ nombre1: "Nuevo" });

      expect(res.status).toBe(400);
    });

    it("debe retornar 204 al actualizar cliente existente", async () => {
      const update = { telefono: "76543210", pais: "Chile" };

      const res = await request(app)
        .put(base + "/1")
        .set("Authorization", `Bearer ${adminToken}`)
        .send(update);

      expect(res.status).toBe(204);
    });
  });

  /* describe("DELETE /:id", () => {
    it("debe retornar 400 si id inválido", async () => {
      const res = await request(app)
        .delete(base + "/abc")
        .set("Authorization", `Bearer ${adminToken}`);

      expect(res.status).toBe(400);
    });

    it("debe retornar 404 si cliente no existe", async () => {
      const res = await request(app)
        .delete(base + "/999999")
        .set("Authorization", `Bearer ${adminToken}`);

      expect(res.status).toBe(404);
    });

    it("debe retornar 204 al eliminar cliente existente", async () => {
      const res = await request(app)
        .delete(base + "/1")
        .set("Authorization", `Bearer ${adminToken}`);

      expect(res.status).toBe(204);
    });
  }); */
});
