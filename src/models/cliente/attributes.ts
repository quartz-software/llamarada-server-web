import { DataTypes } from "sequelize";
import { SequelizeModelAttributes } from "../interfaces";
import { type Attributes, CreationAttributes, Entity } from ".";

const Attributes: SequelizeModelAttributes<
  Entity,
  Attributes,
  CreationAttributes
> = {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
    validate: {
      isInt: true,
    },
  },
  dni: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  nombre1: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  nombre2: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  apellido1: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  apellido2: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  telefono: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  pais: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  idUsuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    onDelete: "CASCADE",
    references: {
      key: "id",
      model: "usuario",
    },
  },
};
export { Attributes };
export default Attributes;
