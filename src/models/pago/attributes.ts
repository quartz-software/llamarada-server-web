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
  fechaPago: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  montoTotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  metodo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  idReserva: {
    type: DataTypes.INTEGER,
    allowNull: false,
    onDelete: "CASCADE",
    references: {
      key: "id",
      model: "reserva",
    },
  },
};
export { Attributes };
export default Attributes;
