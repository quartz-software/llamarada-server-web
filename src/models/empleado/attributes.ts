import { DataTypes } from "sequelize";
import { SequelizeModelAttributes } from "../interfaces";
import { Attributes, CreationAttributes, Entity } from ".";

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
  idRol: {
    type: DataTypes.INTEGER,
    allowNull: false,
    onDelete: "RESTRICT",
    references: {
      key: "id",
      model: "tipo-rol",
    },
  },
  idUsuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    onDelete: "CASCADE",
    references: {
      model: "usuario",
      key: "id",
    },
  },
  idEstado: {
    type: DataTypes.INTEGER,
    allowNull: false,
    onDelete: "RESTRICT",
    references: {
      key: "id",
      model: "estado-empleado",
    },
  },
  fechaContratacion: {
    type: DataTypes.DATE,
    allowNull: false,
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
};
export { Attributes };
export default Attributes;
