import TipoRol from "./tipo-rol/migration";
import EstadoEmpleado from "./estado-empleado/migration";
import Usuario from "./usuario/migration";
import CategoriaStock from "./categoria-stock/migration";
import Stock from "./stock/migration";
import AbastecimientoStock from "./abastecimiento-stock/migration";
import ModificacionStock from "./modificacion-stock/migration";
import { sequelize } from "./index";
import appConfig from "../config/app";
(async () => {
  const qi = sequelize.getQueryInterface();
  if (appConfig.nodeEnv === "development") {
    console.log("------Eliminando Tablas------");
    await qi.dropAllTables();
  }
  console.log("------Creando Tablas------");
  console.log("------TipoRol------");
  await TipoRol.up(qi);
  console.log("------EstadoEmpleado------");
  await EstadoEmpleado.up(qi);
  console.log("------Usuario------");
  await Usuario.up(qi);
  console.log("------CategoriaStock------");
  await CategoriaStock.up(qi);
  console.log("------Stock------");
  await Stock.up(qi);
  console.log("------AbastecimientoStock------");
  await AbastecimientoStock.up(qi);
  console.log("------ModificacionStock------");
  await ModificacionStock.up(qi);
  console.log("------Tablas Creadas------");
})();
