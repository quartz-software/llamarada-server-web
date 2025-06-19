import { DataTypes } from "sequelize";
import { SequelizeModelAttributes } from "../interfaces";
import { type Attributes, CreationAttributes, Entity } from ".";

const Attributes: SequelizeModelAttributes<
  Entity,
  Attributes,
  CreationAttributes
> = {
  idServicio: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
    references: {
      key: "id",
      model: "servicio",
    },
  },
  idHabitacion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
    references: {
      key: "id",
      model: "habitacion",
    },
  },
};

export { Attributes };
export default Attributes;
