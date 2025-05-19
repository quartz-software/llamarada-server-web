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
  fechaInicio: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  fechaFin: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  activo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
};

export { Attributes };
export default Attributes;
