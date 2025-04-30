import { ClienteModel } from "../cliente/model";
import { EmpleadoModel } from "../empleado/model";
import { UsuarioModel } from "./model";

const associate = () => {
  UsuarioModel.hasMany(EmpleadoModel, {
    foreignKey: "idUsuario",
    as: "empleados",
  });
  UsuarioModel.hasMany(ClienteModel, {
    foreignKey: "idUsuario",
    as: "clientes",
  });
};

export { associate };
export default { associate };
