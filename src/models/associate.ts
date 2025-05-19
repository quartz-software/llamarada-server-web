import TipoRol from "./tipo-rol/associate";
import EstadoEmpleado from "./estado-empleado/associate";
import Usuario from "./usuario/associate";
import ModificacionStock from "./modificacion-stock/associate";
import CategoriaStock from "./categoria-stock/associate";
import Stock from "./stock/associate";
import AbastecimientoStock from "./abastecimiento-stock/associate";
import Tarea from "./tarea/associate";
import EstadoTarea from "./estado-tarea/associate";
import Cliente from "./cliente/associate";
import Pago from "./pago/associate";
import DetallePago from "./detalle-pago/associate";
import EstadoReserva from "./estado-reserva/associate";
import Reserva from "./reserva/associate";
import ReservaHabitacion from "./reserva-habitacion/associate";
import ServicioSolicitado from "./servicio-solicitado/associate";
import Servicio from "./servicio/associate";
import PromocionServicio from "./servicio/associate";
import TipoServicio from "./tipo-servicio/associate";
import ServicioHabitacion from "./servicio-habitacion/associate";

function associate() {
  TipoRol.associate();
  EstadoEmpleado.associate();
  Usuario.associate();
  ModificacionStock.associate();
  CategoriaStock.associate();
  Stock.associate();
  AbastecimientoStock.associate();
  Tarea.associate();
  EstadoTarea.associate();
  Cliente.associate();
  Pago.associate();
  DetallePago.associate();
  EstadoReserva.associate();
  Reserva.associate();
  ReservaHabitacion.associate();
  ServicioSolicitado.associate();
  Servicio.associate();
  PromocionServicio.associate();
  TipoServicio.associate();
  ServicioHabitacion.associate();
}

associate();
export { associate };
export default associate;
