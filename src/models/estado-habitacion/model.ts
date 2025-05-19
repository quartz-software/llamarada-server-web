import { Model } from "sequelize";
import { sequelize } from "../index";
import Attributes from "./attributes";
import { Attributes as Attr, CreationAttributes, Entity, TableName } from ".";
import { Habitacion } from "../../types/db/habitacion";

class EstadoHabitacionModel
  extends Model<Attr, CreationAttributes>
  implements Entity
{
  declare id: number;
  declare habitaciones?: Habitacion[] | undefined;
  declare nombre:
    | "disponible"
    | "ocupada"
    | "reservada"
    | "mantenimiento"
    | "limpieza"
    | "bloqueada"
    | "no disponible";
}

EstadoHabitacionModel.init(Attributes, {
  sequelize,
  tableName: TableName,
  timestamps: false,
});

export { EstadoHabitacionModel };
export default { EstadoHabitacionModel };
