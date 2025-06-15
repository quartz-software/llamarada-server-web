import { ClienteModel } from "../cliente/model";
import { EmpleadoModel } from "../empleado/model";
import { UsuarioModel } from "./model";

const associate = () => {
  UsuarioModel.hasOne(EmpleadoModel, {
    foreignKey: "idUsuario",
    as: "empleado",
  });
  UsuarioModel.hasOne(ClienteModel, {
    foreignKey: "idUsuario",
    as: "cliente",
  });
};

export { associate };
export default { associate };
