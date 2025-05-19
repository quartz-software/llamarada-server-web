import { Model } from "sequelize";
import { sequelize } from "../index";
import Attributes from "./attributes";
import { Attributes as Attr, CreationAttributes, Entity, TableName } from ".";
import { Empleado } from "../../types/db/empleado";
import { ServicioSolicitado } from "../../types/db/servicio-solicitado";
import { EstadoTarea } from "../../types/db/estado-tarea";

class TareaModel extends Model<Attr, CreationAttributes> implements Entity {
  declare id: number;
  declare idEstado: number;
  declare idEmpleado: number;
  declare idServicio: number;
  declare descripcion: string;
  declare observaciones?: string | undefined;
  declare fechaInicio: Date;
  declare fechaCompletado?: Date | undefined;

  declare createdAt: Date;

  declare servicio?: ServicioSolicitado | undefined;
  declare empleado?: Empleado | undefined;
  declare estado?: EstadoTarea | undefined;
}

TareaModel.init(Attributes, {
  sequelize,
  tableName: TableName,
  timestamps: true,
  updatedAt: false,
});

export { TareaModel };
export default { TareaModel };
