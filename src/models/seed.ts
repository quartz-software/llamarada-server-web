import TipoRol from "./tipo-rol/seeder";
import EstadoEmpleado from "./estado-empleado/seeder";
import Usuario from "./usuario/seeder";
import CategoriaStock from "./categoria-stock/seeder";
import Stock from "./stock/seeder";
import AbastecimientoStock from "./abastecimiento-stock/seeder";
import ModificacionStock from "./modificacion-stock/seeder";
import Empleado from "./empleado/seeder";
import Tarea from "./tarea/seeder";
import EstadoTarea from "./estado-tarea/seeder";
import Cliente from "./cliente/seeder";
import Pago from "./pago/seeder";
import DetallePago from "./detalle-pago/seeder";
import EstadoReserva from "./estado-reserva/seeder";
import Reserva from "./reserva/seeder";
import ReservaHabitacion from "./reserva-habitacion/seeder";
import ServicioSolicitado from "./servicio-solicitado/seeder";
import TipoServicio from "./tipo-servicio/seeder";
import Servicio from "./servicio/seeder";
import PromocionServicio from "./promocion-servicio/seeder";
import EstadoHabitacion from "./estado-habitacion/seeder";
import TipoHabitacion from "./tipo-habitacion/seeder";
import Habitacion from "./habitacion/seeder";
import ImagenHabitacion from "./imagen-habitacion/seeder";
import ServicioHabitacion from "./servicio-habitacion/seeder";
import Tarifa from "./tarifa/seeder";
import TarifaHabitacion from "./tarifa-habitacion/seeder";
import Ocupacion from "./ocupacion/seeder";
import EstadoServicioSolicitado from "./estado-servicio-solicitado/seeder";
import ImagenPDI from "./imagen-pdi/seeder";
import EstadoPDI from "./estado-pdi/seeder";
import { sequelize } from "./index";
import { QueryInterface } from "sequelize";
import { env } from "../config/env";
const seedDb = async () => {
  const qi = sequelize.getQueryInterface();

  type SeederTuple = [string, { seed: (qi: QueryInterface) => Promise<void> }];

  const seeders: SeederTuple[] = [
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
    ["ReservaHabitacion", ReservaHabitacion],
    ["ImagenHabitacion", ImagenHabitacion],
    ["ServicioHabitacion", ServicioHabitacion],
    ["Tarifa", Tarifa],
    ["TarifaHabitacion", TarifaHabitacion],
    ["Ocupacion", Ocupacion],
    ["EstadoServicioSolicitado", EstadoServicioSolicitado],
    ["ServicioSolicitado", ServicioSolicitado],
    ["EstadoTarea", EstadoTarea],
    ["Tarea", Tarea],
    ["EstadoPDI", EstadoPDI],
    ["ImagenPDI", ImagenPDI],
  ];

  // console.log("------Insertando datos por defecto------");

  for (const [name, model] of seeders) {
    if (env === "dev") {
      console.log(`------${name}------`);
    }
    await model.seed(qi);
  }

  // console.log("------Tablas llenadas------");
};

export { seedDb };
