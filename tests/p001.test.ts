import User from "../src/models/user";
import { EmpleadoModel } from "../src/models/empleado/model";
import { sequelize } from "../src/models/index";

describe("Modelo empleado", () => {
  beforeAll(async () => {
    await sequelize.getQueryInterface().dropAllTables();
    await sequelize.sync();
  });
  afterAll(async () => {
    await sequelize.close();
  });
  describe("Dar de alta Empleado", async () => {
    await User.create({
      email: "user@gmail.com",
      password: "asdf",
      role: "employee",
      dni: "1234",
      documentType: "CI",
      firstname: "a",
      middlename: "b",
      lastname1: "c",
      lastname2: "d",
      phone: "1234",
      address: "1234",
    });
    const d = new Date().toISOString();
    await EmpleadoModel.create({
      role: "admin",
      status: "active",
      hireDate: d,
      userId: 1,
    });

    const savedEmployee = await EmpleadoModel.findOne({
      where: { id: 1 },
      include: [{ model: User, as: "user" }],
    });

    console.log(savedEmployee?.toJSON());
    if (savedEmployee === null) return;
    expect(savedEmployee.toJSON()).toMatchObject({
      email: "user@gmail.com",
      role: "employee",
      dni: "1234",
      documentType: "CI",
      firstname: "a",
      middlename: "b",
      lastname1: "c",
      lastname2: "d",
      phone: "1234",
      address: "1234",
    });
  });
});
