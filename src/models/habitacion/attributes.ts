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
  numeroHabitacion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  capacidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  idEstadoHabitacion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
    references: {
      key: "id",
      model: "estado-habitacion",
    },
  },
  idTipoHabitacion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
    references: {
      key: "id",
      model: "tipo-habitacion",
    },
  },
};
export { Attributes };
export default Attributes;
