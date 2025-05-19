import { DataTypes } from "sequelize";
import { SequelizeModelAttributes } from "../interfaces";
import { Attributes, CreationAttributes, Entity } from ".";

const Attributes: SequelizeModelAttributes<
  Entity,
  Attributes,
  CreationAttributes
> = {
  idHabitacion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
    references: {
      key: "id",
      model: "habitacion",
    },
  },
  idTarifa: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
    references: {
      key: "id",
      model: "tarifa",
    },
  },
};

export { Attributes };
export default Attributes;
