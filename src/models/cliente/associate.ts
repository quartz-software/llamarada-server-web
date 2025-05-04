import { ReservaModel } from "../reserva/model";
import { UsuarioModel } from "../usuario/model";
import { ClienteModel } from "./model";

const associate = () => {
  ClienteModel.belongsTo(UsuarioModel, {
    foreignKey: "idUsuario",
    as: "usuario",
  });
  ClienteModel.hasMany(ReservaModel, {
    foreignKey: "idCliente",
    as: "reservas",
  });
};

export { associate };
export default { associate };
