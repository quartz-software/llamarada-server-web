import request from "supertest";
import app from "../../app";
import { getAuthToken } from "./utils/tokens";

describe("GET /api/tarea", () => {
  it("debe rechazar el acceso si no hay token", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.status).toBe(401);
  });

  /* it("debe devolver una lista de tareas si es administrador", async () => {
    const token = await getAuthToken("administrador");
    const res = await request(app)
      .get("/api/tasks")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  }); */
/* 
  it("debe permitir filtrar tareas por idEstado", async () => {
    const token = await getAuthToken("administrador");
    const res = await request(app)
      .get("/api/tasks")
      .query({ status: 1 })
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  }); */
});

describe("GET /api/tasks/:id", () => {
  it("debe rechazar el acceso sin token", async () => {
    const res = await request(app).get("/api/tasks/1");
    expect(res.status).toBe(401);
  });

  it("debe devolver 400 si el id no es válido", async () => {
    const token = await getAuthToken("administrador");
    const res = await request(app)
      .get("/api/tasks/abc")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(400);
  });

  it("debe devolver 404 si no existe la tarea", async () => {
    const token = await getAuthToken("administrador");
    const res = await request(app)
      .get("/api/tasks/99999")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(404);
  });
});
