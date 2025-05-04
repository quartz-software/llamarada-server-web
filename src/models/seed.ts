import TipoRol from "./tipo-rol/seeder";
import EstadoEmpleado from "./estado-empleado/seeder";
import Usuario from "./usuario/seeder";
import CategoriaStock from "./categoria-stock/seeder";
import { sequelize } from "./index";
(async () => {
  const qi = sequelize.getQueryInterface();
  console.log("------Llenando datos------");
  console.log("------TipoRol------");
  await TipoRol.seed(qi);
  console.log("------EstadoEmpleado------");
  await EstadoEmpleado.seed(qi);
  console.log("------Usuario------");
  await Usuario.seed(qi);
  console.log("------CategoriaStock------");
  await CategoriaStock.seed(qi);
  console.log("------Tablas llenadas------");
})();
