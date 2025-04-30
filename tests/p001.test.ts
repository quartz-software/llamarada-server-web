import User from "../src/models/user";
import Employee from "../src/models/employee";
import { sequelize } from "../src/models/index";

describe("Stock Model", () => {
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
    await Employee.create({
      role: "admin",
      status: "active",
      hireDate: d,
      userId: 1,
    });

    const savedEmployee = await Employee.findOne({
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
