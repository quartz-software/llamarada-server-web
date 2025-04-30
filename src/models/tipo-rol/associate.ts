import { EmpleadoModel } from "../empleado/model";
import { TipoRolModel } from "./model";

const associate = () => {
  TipoRolModel.hasMany(EmpleadoModel, {
    foreignKey: "idRol",
    as: "empleados",
  });
};

export { associate };
export default { associate };
