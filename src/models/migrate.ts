import TipoRol from "./tipo-rol/migration";
import EstadoEmpleado from "./estado-empleado/migration";
import Usuario from "./usuario/migration";
import CategoriaStock from "./categoria-stock/migration";
import Stock from "./stock/migration";
import AbastecimientoStock from "./abastecimiento-stock/migration";
import ModificacionStock from "./modificacion-stock/migration";
import Empleado from "./empleado/migration";
import Tarea from "./tarea/migration";
import EstadoTarea from "./estado-tarea/migration";
import Cliente from "./cliente/migration";
import Pago from "./pago/migration";
import DetallePago from "./detalle-pago/migration";
import EstadoReserva from "./estado-reserva/migration";
import Reserva from "./reserva/migration";
import ReservaHabitacion from "./reserva-habitacion/migration";
import EstadoServicioSolicitado from "./estado-servicio-solicitado/migration";
import ServicioSolicitado from "./servicio-solicitado/migration";
import Servicio from "./servicio/migration";
import PromocionServicio from "./promocion-servicio/migration";
import TipoServicio from "./tipo-servicio/migration";
import ServicioHabitacion from "./servicio-habitacion/migration";
import Habitacion from "./habitacion/migration";
import TipoHabitacion from "./tipo-habitacion/migration";
import EstadoHabitacion from "./estado-habitacion/migration";
import TarifaHabitacion from "./tarifa-habitacion/migration";
import ImagenHabitacion from "./imagen-habitacion/migration";
import Tarifa from "./tarifa/migration";
import Ocupacion from "./ocupacion/migration";
import EstadoPDI from "./estado-pdi/migration";
import ImagenPDI from "./imagen-pdi/migration";
import { sequelize } from "./index";
import { QueryInterface } from "sequelize";
import { env } from "../config/env";
const migrateDb = async () => {
  const qi = sequelize.getQueryInterface();
  type MigrationTuple = [string, { up: (qi: QueryInterface) => Promise<void> }];
  const migrations: MigrationTuple[] = [
    ["Usuario", Usuario],
    ["EstadoEmpleado", EstadoEmpleado],
    ["TipoRol", TipoRol],
    ["Empleado", Empleado],
    ["CategoriaStock", CategoriaStock],
    ["Stock", Stock],
    ["AbastecimientoStock", AbastecimientoStock],
    ["ModificacionStock", ModificacionStock],
    ["TipoServicio", TipoServicio],
    ["Servicio", Servicio],
    ["PromocionServicio", PromocionServicio],
    ["Cliente", Cliente],
    ["EstadoReserva", EstadoReserva],
    ["Reserva", Reserva],
    ["Pago", Pago],
    ["DetallePago", DetallePago],
    ["EstadoHabitacion", EstadoHabitacion],
    ["TipoHabitacion", TipoHabitacion],
    ["Habitacion", Habitacion],
    ["EstadoPDI", EstadoPDI],
    ["ImagenPDI", ImagenPDI],
    ["ImagenHabitacion", ImagenHabitacion],
    ["ReservaHabitacion", ReservaHabitacion],
    ["ServicioHabitacion", ServicioHabitacion],
    ["Tarifa", Tarifa],
    ["TarifaHabitacion", TarifaHabitacion],
    ["Ocupacion", Ocupacion],
    ["EstadoServicioSolicitado", EstadoServicioSolicitado],
    ["ServicioSolicitado", ServicioSolicitado],
    ["EstadoTarea", EstadoTarea],
    ["Tarea", Tarea],
  ];

  // console.log("------Creando Tablas------");
  for (const [name, model] of migrations) {
    if (env === "dev") {
      console.log(`------${name}------`);
    }
    await model.up(qi);
  }
  // console.log("------Tablas Creadas------");
};
export { migrateDb };
