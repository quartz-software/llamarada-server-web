import { Model } from "sequelize";
import { sequelize } from "../index";
import Attributes from "./attributes";
import { Attributes as Attr, CreationAttributes, Entity, TableName } from ".";
import { EstadoPDI } from "../../types/db/estado-pdi";
import { Habitacion } from "../../types/db/habitacion";

class ImagenPDIModel extends Model<Attr, CreationAttributes> implements Entity {
  declare id: number;
  declare url: string;
  declare idEstado: number;
  declare idHabitacion: number;
  declare habitacion?: Habitacion | undefined;
  declare estado?: EstadoPDI | undefined;
}

ImagenPDIModel.init(Attributes, {
  sequelize,
  tableName: TableName,
  timestamps: false,
});

export { ImagenPDIModel };
export default { ImagenPDIModel };
