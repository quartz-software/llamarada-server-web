import TipoRol from "./tipo-rol/migration";
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
  console.log("------Tablas Creadas------");
})();
