import { Model } from "sequelize";
import { sequelize } from "../index";
import Attributes from "./attributes";
import { Attributes as Attr, CreationAttributes, Entity, TableName } from ".";
import { Habitacion } from "../../types/db/habitacion";

class ImagenHabitacionModel
  extends Model<Attr, CreationAttributes>
  implements Entity
{
  declare tipoImagen: "panoramica" | "3d" | "plano";
  declare url: string;
  declare descripcion?: string | undefined;
  declare idHabitacion: number;
  declare habitacion?: Habitacion | undefined;
  declare id: number;
}

ImagenHabitacionModel.init(Attributes, {
  sequelize,
  tableName: TableName,
  timestamps: false,
});

export { ImagenHabitacionModel };
export default { ImagenHabitacionModel };
