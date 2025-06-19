import { Model } from "sequelize";
import { sequelize } from "../index";
import Attributes from "./attributes";
import { type Attributes as Attr, CreationAttributes, Entity, TableName } from ".";
import { Tarea } from "../../types/db/tarea";

class EstadoTareaModel
  extends Model<Attr, CreationAttributes>
  implements Entity {
  declare id: number;
  declare nombre: "pendiente" | "en progreso" | "finalizado" | "cancelado";
  declare tareas?: Tarea[] | undefined;
}

EstadoTareaModel.init(Attributes, {
  sequelize,
  tableName: TableName,
  timestamps: false,
});

export { EstadoTareaModel };
export default { EstadoTareaModel };
