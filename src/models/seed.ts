import TipoRol from "./tipo-rol/seeder";
import { sequelize } from "./index";
(async () => {
  const qi = sequelize.getQueryInterface();
  console.log("------Llenando datos------");
  console.log("------TipoRol------");
  await TipoRol.seed(qi);
  console.log("------Tablas llenadas------");
})();
