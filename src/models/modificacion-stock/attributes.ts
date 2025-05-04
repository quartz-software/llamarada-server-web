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
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  motivo: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  idEmpleado: {
    type: DataTypes.INTEGER,
    allowNull: true,
    onDelete: "SET NULL",
    references: {
      key: "id",
      model: "empleado",
    },
  },
  idStock: {
    type: DataTypes.INTEGER,
    allowNull: true,
    onDelete: "CASCADE",
    references: {
      key: "id",
      model: "stock",
    },
  },
};
export { Attributes };
export default Attributes;
