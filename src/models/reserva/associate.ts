import { ClienteModel } from "../cliente/model";
import { EmpleadoModel } from "../empleado/model";
import { EstadoReservaModel } from "../estado-reserva/model";
import { HabitacionModel } from "../habitacion/model";
import { PagoModel } from "../pago/model";
import { ReservaHabitacionModel } from "../reserva-habitacion/model";
import { ServicioSolicitadoModel } from "../servicio-solicitado/model";
import { ReservaModel } from "./model";

const associate = () => {
  ReservaModel.belongsTo(EmpleadoModel, {
    foreignKey: "idEmpleado",
    as: "empleado",
  });
  ReservaModel.belongsTo(EstadoReservaModel, {
    foreignKey: "idEstado",
    as: "estado",
  });
  ReservaModel.belongsTo(ClienteModel, {
    foreignKey: "idCliente",
    as: "cliente",
  });
  ReservaModel.hasMany(PagoModel, {
    foreignKey: "idReserva",
    as: "pagos",
  });
  ReservaModel.hasMany(ServicioSolicitadoModel, {
    foreignKey: "idReserva",
    as: "servicios",
  });
  ReservaModel.belongsToMany(HabitacionModel, {
    through: ReservaHabitacionModel,
    foreignKey: "idReserva",
    otherKey: "idHabitacion",
    as: "habitaciones",
  });
};

export { associate };
export default { associate };
