import { DataTypes } from "sequelize";
import { SequelizeModelAttributes } from "../interfaces";
import { Attributes, CreationAttributes, Entity } from ".";

const Attributes: SequelizeModelAttributes<
  Entity,
  Attributes,
  CreationAttributes
> = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  numAdultos: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  numNinos: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  checkIn: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  checkOut: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  checkOutReal: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  precioTotal: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  origenReserva: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  idEmpleado: {
    type: DataTypes.DATE,
    allowNull: true,
    onDelete: "RESTRICT",
    references: {
      key: "id",
      model: "empleado",
    },
  },
  idEstado: {
    type: DataTypes.DATE,
    allowNull: true,
    onDelete: "RESTRICT",
    references: {
      key: "id",
      model: "estado-reserva",
    },
  },
  idCliente: {
    type: DataTypes.DATE,
    allowNull: true,
    onDelete: "RESTRICT",
    references: {
      key: "id",
      model: "cliente",
    },
  },
};
export { Attributes };
export default Attributes;
