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
  url: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  idEstado: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "estado-pdi",
      key: "id",
    },
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  },
  idHabitacion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "habitacion",
      key: "id",
    },
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  },
};
export { Attributes };
export default Attributes;
