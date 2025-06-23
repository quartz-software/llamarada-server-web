import request from "supertest";
import app from "../../app";
import { getAuthToken } from "./utils/tokens";

describe("GET /api/tarea", () => {
  it("debe rechazar el acceso si no hay token", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.status).toBe(401);
  });

  it("debe devolver una lista de tareas si es administrador", async () => {
    const token = await getAuthToken("administrador");
    const res = await request(app)
      .get("/api/tasks")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("debe permitir filtrar tareas por idEstado", async () => {
    const token = await getAuthToken("administrador");
    const res = await request(app)
      .get("/api/tasks")
      .query({ status: 1 })
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
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

  /*  it("debe devolver una tarea si existe", async () => {
    const token = await getAuthToken("administrador");
    const nuevaTarea = {
      idEstado: 1,
      idEmpleado: 1,
      idServicio: 1,
      descripcion: "Tarea test",
      fechaInicio: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    const postRes = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send(nuevaTarea);

    const id = postRes.body.id;
    console.log(postRes.status);

    const res = await request(app)
      .get(`/api/tasks/${id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.descripcion).toBe("Tarea test");
  }); */
});

/* describe("POST /api/tasks", () => {
  it("debe rechazar el acceso sin token", async () => {
    const res = await request(app).post("/api/tasks").send({});
    expect(res.status).toBe(401);
  });

  it("debe devolver 400 si los datos son inválidos", async () => {
    const token = await getAuthToken("administrador");
    const res = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({});

    expect(res.status).toBe(400);
  });

  it("debe crear una tarea con datos válidos", async () => {
    const token = await getAuthToken("administrador");
    const nuevaTarea = {
      idEstado: 1,
      idEmpleado: 1,
      idServicio: 1,
      descripcion: "Nueva tarea desde test",
      fechaInicio: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    const res = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send(nuevaTarea);

    expect(res.status).toBe(201);
    expect(res.body.descripcion).toBe("Nueva tarea desde test");
  });
});

describe("PUT /api/tasks/:id", () => {
  it("debe rechazar el acceso sin token", async () => {
    const res = await request(app).put("/api/tasks/1").send({});
    expect(res.status).toBe(401);
  });

  it("debe devolver 400 si el id o los datos son inválidos", async () => {
    const token = await getAuthToken("administrador");
    const res = await request(app)
      .put("/api/tasks/invalid")
      .set("Authorization", `Bearer ${token}`)
      .send({});

    expect(res.status).toBe(400);
  });

  it("debe actualizar la tarea con datos válidos", async () => {
    const token = await getAuthToken("administrador");

    const nuevaTarea = {
      idEstado: 1,
      idEmpleado: 1,
      idServicio: 1,
      descripcion: "Tarea para actualizar",
      fechaInicio: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    const postRes = await request(app)
      .post("/api/tarea")
      .set("Authorization", `Bearer ${token}`)
      .send(nuevaTarea);

    const id = postRes.body.id;

    const res = await request(app)
      .put(`/api/tarea/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ descripcion: "Tarea actualizada desde test" });

    expect(res.status).toBe(204);
  });
}); */
