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
  nombre: {
    type: DataTypes.ENUM(
      "disponible",
      "ocupada",
      "reservada",
      "mantenimiento",
      "limpieza",
      "bloqueada",
      "no disponible"
    ),
    allowNull: false,
  },
};

export { Attributes };
export default Attributes;
