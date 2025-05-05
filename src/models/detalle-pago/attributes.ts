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
  concepto: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  monto: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  pagado: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  idPago: {
    type: DataTypes.INTEGER,
    allowNull: false,
    onDelete: "CASCADE",
    references: {
      key: "id",
      model: "pago",
    },
  },
};
export { Attributes };
export default Attributes;
