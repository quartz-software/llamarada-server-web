import { DataTypes, Model } from "sequelize";
import sequelize from "./index";

class RoomSequelize extends Model {}

RoomSequelize.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      validate: {
        isInt: true,
      },
    },
    roomNumber: {
      type: DataTypes.STRING(10),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: true,
        isIn: [["suite", "normal", "premium"]],
      },
    },
    pricePerNight: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
        min: 0.0,
      },
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        // no disponible para reservacopnes
        isIn: [
          ["unavailable", "available", "occupied", "maintenance", "cleaning"],
        ],
      },
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1,
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "rooms",
    timestamps: false,
  }
);

export default RoomSequelize;
