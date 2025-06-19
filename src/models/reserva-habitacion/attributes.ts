import { DataTypes } from "sequelize";
import { SequelizeModelAttributes } from "../interfaces";
import { type Attributes, CreationAttributes, Entity } from ".";

const Attributes: SequelizeModelAttributes<
  Entity,
  Attributes,
  CreationAttributes
> = {
  idHabitacion: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    onDelete: "RESTRICT",
    references: {
      key: "id",
      model: "habitacion",
    },
  },
  idReserva: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    onDelete: "RESTRICT",
    references: {
      key: "id",
      model: "reserva",
    },
  },
};
export { Attributes };
export default Attributes;
