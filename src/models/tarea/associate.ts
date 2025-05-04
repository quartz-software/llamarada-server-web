import { EmpleadoModel } from "../empleado/model";
import { EstadoTareaModel } from "../estado-tarea/model";
import { ServicioSolicitadoModel } from "../servicio-solicitado/model";
import { TareaModel } from "./model";

const associate = () => {
  TareaModel.belongsTo(EmpleadoModel, {
    foreignKey: "idEmpleado",
    as: "empleado",
  });
  TareaModel.belongsTo(EstadoTareaModel, {
    foreignKey: "idEstado",
    as: "estado",
  });
  TareaModel.belongsTo(ServicioSolicitadoModel, {
    foreignKey: "idServicio",
    as: "servicio",
  });
};

export { associate };
export default { associate };
