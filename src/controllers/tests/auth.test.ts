import request from "supertest";
import app from "../../app";
import { getAuthToken } from "./utils/tokens";

describe("POST /api/auth/login", () => {
  // POST:/login
  it("debe retornar un token", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ correo: "admin1@email.com", password: "admin1pass" });

    expect(res.status).toBe(200);
    expect(typeof res.body.token).toBe("string");
  });
  it("debe rechazar el acceso si el correo tiene un formato inválido", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ correo: "correo-invalido", password: "admin1pass" });

    expect(res.status).toBe(400);
  });
  it("debe rechazar el acceso si el usuario no existe", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ correo: "admin2@email.com", password: "admin1pass" });

    expect(res.status).toBe(401);
  });
  it("debe rechazar el acceso si la contraseña es incorrecta", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ correo: "admin1@email.com", password: "claveIncorrecta" });

    expect(res.status).toBe(401);
  });
});

describe("GET /api/auth/role", () => {
  it("debe rechazar el acceso si no hay token", async () => {
    const res = await request(app).get("/api/auth/role");

    expect(res.status).toBe(401);
  });

  it("debe retornar 'administrador' si el usuario es administrador", async () => {
    const token = await getAuthToken("administrador");

    const res = await request(app)
      .get("/api/auth/role")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toBe("administrador");
  });

  it("debe retornar 'recepcionista' si el usuario es recepcionista", async () => {
    const token = await getAuthToken("recepcionista");

    const res = await request(app)
      .get("/api/auth/role")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toBe("recepcionista");
  });

  it("debe retornar 'limpieza' si el usuario es de limpieza", async () => {
    const token = await getAuthToken("limpieza");

    const res = await request(app)
      .get("/api/auth/role")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toBe("limpieza");
  });

  it("debe retornar 'mantenimiento' si el usuario es de mantenimiento", async () => {
    const token = await getAuthToken("mantenimiento");

    const res = await request(app)
      .get("/api/auth/role")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toBe("mantenimiento");
  });

  it("debe retornar 'cliente' si el usuario es cliente", async () => {
    const token = await getAuthToken("cliente");

    const res = await request(app)
      .get("/api/auth/role")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toBe("cliente");
  });
});
