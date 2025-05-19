import { Model } from "sequelize";
import { sequelize } from "../index";
import Attributes from "./attributes";
import { Attributes as Attr, CreationAttributes, Entity, TableName } from ".";
import { EstadoEmpleado } from "../../types/db/estado-empleado";
import { ModificacionStock } from "../../types/db/modificacion-stock";
import { Reserva } from "../../types/db/reserva";
import { Tarea } from "../../types/db/tarea";
import { TipoRol } from "../../types/db/tipo-rol";
import { Usuario } from "../../types/db/usuario";

class EmpleadoModel extends Model<Attr, CreationAttributes> implements Entity {
  declare id: number;
  declare idUsuario: number;
  declare idRol: number;
  declare idEstado: number;
  declare fechaContratacion: Date;
  declare dni: string;
  declare nombre1: string;
  declare nombre2?: string;
  declare apellido1: string;
  declare apellido2?: string;
  declare telefono?: string | undefined;

  declare estado?: EstadoEmpleado | undefined;
  declare rol?: TipoRol | undefined;
  declare usuario?: Usuario | undefined;
  declare reservas?: Reserva[] | undefined;
  declare tareas?: Tarea[] | undefined;
  declare modificaciones?: ModificacionStock[] | undefined;
}

EmpleadoModel.init(Attributes, {
  sequelize,
  tableName: TableName,
  timestamps: false,
});

export { EmpleadoModel };
export default { EmpleadoModel };
