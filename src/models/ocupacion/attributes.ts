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
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  idHabitacion: {
    type: DataTypes.INTEGER,
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
