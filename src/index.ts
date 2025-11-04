import app from "./app";
import appConfig from "./config/app";
import { setupSwagger } from './config/swagger';
import sequelize from './models';

const port = appConfig.port || 3000;

setupSwagger(app);

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexion a base de datos exitosa");
    console.log(`Servidor activo en: http://localhost:${port}`);
  } catch (error) {
    console.log("Error al levantar la aplicacion");
    console.log(error);
  }
});
