import request from "supertest";
import app from "../../app";
import { sequelize } from "../../models";
import jwt from "jsonwebtoken";
import appConfig from "../../config/app";
import { HabitacionModel } from "../../models/habitacion/model";

const ADMIN_TOKEN = jwt.sign(
  { rol: "administrador", id: 1 },
  appConfig.secret || "test_secret"
);
const USER_TOKEN = jwt.sign(
  { rol: "cliente", id: 2 },
  appConfig.secret || "test_secret"
);

jest.mock("../../models/habitacion/model");

const mockedModel = HabitacionModel as jest.Mocked<typeof HabitacionModel>;

describe("HabitacionController", () => {
  beforeAll(async () => {
    await sequelize.authenticate();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe.skip("GET /rooms", () => {
    it("should return a list of available rooms for normal user", async () => {
      mockedModel.findAll.mockResolvedValue([
        {
          toJSON: () => ({
            id: 1,
            numeroHabitacion: "102",
            capacidad: 2,
            descripcion: "",
            idEstadoHabitacion: 1,
            idTipoHabitacion: 1,
            tipo: {
              nombre: "normal"
            },
            estado: {
              nombre: "disponible"
            }
          }),
        },
      ] as any);

      const res = await request(app)
        .get("/api/rooms")
        .set("Authorization", `Bearer ${USER_TOKEN}`);

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
      expect(mockedModel.findAll).toHaveBeenCalled();
    });

    it("should return all rooms for admin", async () => {
      mockedModel.findAll.mockResolvedValue([
        {
          toJSON: () => ({
            id: 1,
            numeroHabitacion: "102",
            capacidad: 2,
            descripcion: "",
            idEstadoHabitacion: 1,
            idTipoHabitacion: 1,
            tipo: {
              nombre: "normal"
            },
            estado: {
              nombre: "disponible"
            }
          }),
        },
      ] as any);

      const res = await request(app)
        .get("/api/rooms")
        .set("Authorization", `Bearer ${ADMIN_TOKEN}`);

      expect(res.status).toBe(200);
      expect(mockedModel.findAll).toHaveBeenCalledWith(
        expect.objectContaining({})
      );
    });
  });

  describe.skip("GET /rooms/:id", () => {

    it("should return 404 if room not found", async () => {
      mockedModel.findOne.mockResolvedValue(null);

      const res = await request(app)
        .get("/api/rooms/999")
        .set("Authorization", `Bearer ${ADMIN_TOKEN}`);

      expect(res.status).toBe(404);
    });

    it("should return 400 for invalid id", async () => {
      const res = await request(app)
        .get("/api/rooms/abc")
        .set("Authorization", `Bearer ${USER_TOKEN}`);

      expect(res.status).toBe(400);
    });
  });

  describe("POST /rooms", () => {
    it("should create a room with admin role", async () => {
      const newRoom = {
        numeroHabitacion: "118",
        capacidad: 3,
        descripcion: "",
        idEstadoHabitacion: 1,
        idTipoHabitacion: 1,
        imagenes: []
      };

      mockedModel.create.mockResolvedValue({
        toJSON: () => ({ newRoom }),
      } as any);

      const res = await request(app)
        .post("/api/rooms")
        .set("Authorization", `Bearer ${ADMIN_TOKEN}`)
        .send(newRoom);

      expect(res.status).toBe(201);
      expect(res.body.numeroHabitacion).toBe("118");
    });

    it("should return 400 if invalid data", async () => {
      const res = await request(app)
        .post("/api/rooms")
        .set("Authorization", `Bearer ${ADMIN_TOKEN}`)
        .send({});

      expect(res.status).toBe(400);
    });
  });

  describe.skip("PUT /rooms/:id", () => {
    it("should update a roooms with valid data", async () => {
      mockedModel.update.mockResolvedValue([1]);

      const res = await request(app)
        .put("/api/rooms/1")
        .set("Authorization", `Bearer ${ADMIN_TOKEN}`)
        .send({ numeroHabitacion: "120" });

      expect(res.status).toBe(204);
      expect(mockedModel.update).toHaveBeenCalledWith(
        { nombre: "Habitacion actualizada" },
        { where: { id: "1" } }
      );
    });

    it("should return 400 for invalid input", async () => {
      const res = await request(app)
        .put("/api/rooms/abc")
        .set("Authorization", `Bearer ${ADMIN_TOKEN}`)
        .send({ numeroHabitacion: 180 });

      expect(res.status).toBe(400);
    });
  });

  describe.skip("DELETE /rooms/:id", () => {
    it("should delete a rooms", async () => {
      mockedModel.destroy.mockResolvedValue(1);

      const res = await request(app)
        .delete("/api/rooms/1")
        .set("Authorization", `Bearer ${ADMIN_TOKEN}`);

      expect(res.status).toBe(204);
      expect(mockedModel.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it("should return 400 for invalid ID", async () => {
      const res = await request(app)
        .delete("/api/rooms/xyz")
        .set("Authorization", `Bearer ${ADMIN_TOKEN}`);

      expect(res.status).toBe(400);
    });
  });
});
