import { EmpleadoModel } from "../empleado/model";
import { EstadoEmpleadoModel } from "./model";

const associate = () => {
  EstadoEmpleadoModel.hasMany(EmpleadoModel, {
    foreignKey: "idRol",
    as: "empleados",
  });
};

export { associate };
export default { associate };
