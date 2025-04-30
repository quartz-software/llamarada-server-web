import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index";

class AdditionalServiceSequelize extends Model {}

AdditionalServiceSequelize.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      validate: {
        isInt: true,
      },
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [
          [
            "pending",
            "accepted",
            "rejected",
            "in_progress",
            "completed",
            "cancelled",
            "failed",
          ],
        ],
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        key: "id",
        model: "services",
      },
    },
    bookingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        key: "id",
        model: "bookings",
      },
    },
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        key: "id",
        model: "rooms",
      },
    },
  },
  {
    sequelize,
    tableName: "additional_services",
    timestamps: false,
  }
);

export default AdditionalServiceSequelize;
