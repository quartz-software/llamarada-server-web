import { EstadoEmpleadoModel } from "../estado-empleado/model";
import { ModificacionStockModel } from "../modificacion-stock/model";
import { ReservaModel } from "../reserva/model";
import { TareaModel } from "../tarea/model";
import { TipoRolModel } from "../tipo-rol/model";
import { UsuarioModel } from "../usuario/model";
import { EmpleadoModel } from "./model";

const associate = () => {
  EmpleadoModel.belongsTo(TipoRolModel, {
    foreignKey: "idRol",
    as: "rol",
  });
  EmpleadoModel.belongsTo(EstadoEmpleadoModel, {
    foreignKey: "idEstado",
    as: "estado",
  });
  EmpleadoModel.belongsTo(UsuarioModel, {
    foreignKey: "idUsuario",
    as: "usuario",
  });
  EmpleadoModel.hasMany(ModificacionStockModel, {
    foreignKey: "idEmpleado",
    as: "modificaciones",
  });
  EmpleadoModel.hasMany(TareaModel, {
    foreignKey: "idEmpleado",
    as: "tareas",
  });
  EmpleadoModel.hasMany(ReservaModel, {
    foreignKey: "idEmpleado",
    as: "reservas",
  });
};

export { associate };
export default { associate };
