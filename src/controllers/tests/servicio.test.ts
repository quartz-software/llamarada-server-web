import request from "supertest";
import app from "../../app";
import { ServicioModel } from "../../models/servicio/model";
import { sequelize } from "../../models";
import jwt from "jsonwebtoken";
import appConfig from "../../config/app";

const ADMIN_TOKEN = jwt.sign(
  { rol: "administrador", id: 1 },
  appConfig.secret || "test_secret"
);
const USER_TOKEN = jwt.sign(
  { rol: "cliente", id: 2 },
  appConfig.secret || "test_secret"
);

jest.mock("../../models/servicio/model");

const mockedModel = ServicioModel as jest.Mocked<typeof ServicioModel>;

describe("ServicioController", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /services", () => {
    it("should return a list of available services for normal user", async () => {
      mockedModel.findAll.mockResolvedValue([
        {
          toJSON: () => ({ id: 1, nombre: "Spa", disponible: true }),
        },
      ] as any);

      const res = await request(app)
        .get("/services")
        .set("Authorization", `Bearer ${USER_TOKEN}`);

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
      expect(mockedModel.findAll).toHaveBeenCalled();
    });

    it("should return all services for admin", async () => {
      mockedModel.findAll.mockResolvedValue([
        {
          toJSON: () => ({ id: 1, nombre: "Spa", disponible: false }),
        },
      ] as any);

      const res = await request(app)
        .get("/services")
        .set("Authorization", `Bearer ${ADMIN_TOKEN}`);

      expect(res.status).toBe(200);
      expect(mockedModel.findAll).toHaveBeenCalledWith(
        expect.objectContaining({})
      );
    });
  });

  describe("GET /services/:id", () => {
    it("should return a specific available service for normal user", async () => {
      mockedModel.findOne.mockResolvedValue({
        toJSON: () => ({ id: 1, nombre: "Spa", disponible: true }),
      } as any);

      const res = await request(app)
        .get("/services/1")
        .set("Authorization", `Bearer ${USER_TOKEN}`);

      expect(res.status).toBe(200);
      expect(mockedModel.findOne).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ id: 1, disponible: true }),
        })
      );
    });

    it("should return 404 if service not found", async () => {
      mockedModel.findOne.mockResolvedValue(null);

      const res = await request(app)
        .get("/services/999")
        .set("Authorization", `Bearer ${ADMIN_TOKEN}`);

      expect(res.status).toBe(404);
    });

    it("should return 400 for invalid id", async () => {
      const res = await request(app)
        .get("/services/abc")
        .set("Authorization", `Bearer ${USER_TOKEN}`);

      expect(res.status).toBe(400);
    });
  });

  describe("POST /services", () => {
    it("should create a service with admin role", async () => {
      const newService = { nombre: "Masaje", disponible: true };

      mockedModel.create.mockResolvedValue({
        toJSON: () => ({ id: 2, ...newService }),
      } as any);

      const res = await request(app)
        .post("/services")
        .set("Authorization", `Bearer ${ADMIN_TOKEN}`)
        .send(newService);

      expect(res.status).toBe(201);
      expect(res.body.nombre).toBe("Masaje");
    });

    it("should return 400 if invalid data", async () => {
      const res = await request(app)
        .post("/services")
        .set("Authorization", `Bearer ${ADMIN_TOKEN}`)
        .send({});

      expect(res.status).toBe(400);
    });
  });

  describe("PUT /services/:id", () => {
    it("should update a service with valid data", async () => {
      mockedModel.update.mockResolvedValue([1]);

      const res = await request(app)
        .put("/services/1")
        .set("Authorization", `Bearer ${ADMIN_TOKEN}`)
        .send({ nombre: "Servicio actualizado" });

      expect(res.status).toBe(204);
      expect(mockedModel.update).toHaveBeenCalledWith(
        { nombre: "Servicio actualizado" },
        { where: { id: "1" } }
      );
    });

    it("should return 400 for invalid input", async () => {
      const res = await request(app)
        .put("/services/abc")
        .set("Authorization", `Bearer ${ADMIN_TOKEN}`)
        .send({ nombre: "test" });

      expect(res.status).toBe(400);
    });
  });

  describe("DELETE /services/:id", () => {
    it("should delete a service", async () => {
      mockedModel.destroy.mockResolvedValue(1);

      const res = await request(app)
        .delete("/services/1")
        .set("Authorization", `Bearer ${ADMIN_TOKEN}`);

      expect(res.status).toBe(204);
      expect(mockedModel.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it("should return 400 for invalid ID", async () => {
      const res = await request(app)
        .delete("/services/xyz")
        .set("Authorization", `Bearer ${ADMIN_TOKEN}`);

      expect(res.status).toBe(400);
    });
  });
});
