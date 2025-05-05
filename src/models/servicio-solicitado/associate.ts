import { EstadoServicioSolicitadoModel } from "../estado-servicio-solicitado/model";
import { HabitacionModel } from "../habitacion/model";
import { ReservaModel } from "../reserva/model";
import { ServicioModel } from "../servicio/model";
import { TareaModel } from "../tarea/model";
import { ServicioSolicitadoModel } from "./model";

const associate = () => {
  ServicioSolicitadoModel.belongsTo(EstadoServicioSolicitadoModel, {
    foreignKey: "idEstado",
    as: "estado",
  });
  ServicioSolicitadoModel.belongsTo(ServicioModel, {
    foreignKey: "idServicio",
    as: "servicio",
  });
  ServicioSolicitadoModel.belongsTo(ReservaModel, {
    foreignKey: "idReserva",
    as: "reserva",
  });
  ServicioSolicitadoModel.belongsTo(HabitacionModel, {
    foreignKey: "idHabitacion",
    as: "habitacion",
  });
  ServicioSolicitadoModel.hasOne(TareaModel, {
    foreignKey: "idServicio",
    as: "tarea",
  });
};

export { associate };
export default { associate };
