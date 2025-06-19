import { DataTypes } from "sequelize";
import { SequelizeModelAttributes } from "../interfaces";
import { type Attributes, CreationAttributes, Entity } from ".";

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
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  observaciones: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  fechaInicio: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fechaCompletado: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  idEstado: {
    type: DataTypes.INTEGER,
    allowNull: false,
    onDelete: "RESTRICT",
    references: {
      key: "id",
      model: "estado-tarea",
    },
  },
  idEmpleado: {
    type: DataTypes.INTEGER,
    allowNull: false,
    onDelete: "RESTRICT",
    references: {
      key: "id",
      model: "empleado",
    },
  },
  idServicio: {
    type: DataTypes.INTEGER,
    allowNull: false,
    onDelete: "RESTRICT",
    references: {
      key: "id",
      model: "servicio-solicitado",
    },
  },
};
export { Attributes };
export default Attributes;
