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
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  restricciones: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  moneda: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  horaApertura: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  horaCierre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  disponible: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  idTipoServicio: {
    type: DataTypes.INTEGER,
    allowNull: false,
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
    references: {
      key: "id",
      model: "tipo-servicio",
    },
  },
};

export { Attributes };
export default Attributes;
