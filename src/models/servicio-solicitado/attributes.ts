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
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  idEstado: {
    type: DataTypes.INTEGER,
    allowNull: false,
    onDelete: "RESTRICT",
    references: {
      key: "id",
      model: "estado-servicio-solicitado",
    },
  },
  idServicio: {
    type: DataTypes.INTEGER,
    allowNull: false,
    onDelete: "RESTRICT",
    references: {
      key: "id",
      model: "servicio",
    },
  },
  idReserva: {
    type: DataTypes.INTEGER,
    allowNull: false,
    onDelete: "RESTRICT",
    references: {
      key: "id",
      model: "reserva",
    },
  },
  idHabitacion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    onDelete: "RESTRICT",
    references: {
      key: "id",
      model: "habitacion",
    },
  },
};
export { Attributes };
export default Attributes;
