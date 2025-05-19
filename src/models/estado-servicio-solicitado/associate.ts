import { ServicioSolicitadoModel } from "../servicio-solicitado/model";
import { EstadoServicioSolicitadoModel } from "./model";

const associate = () => {
  EstadoServicioSolicitadoModel.hasMany(ServicioSolicitadoModel, {
    foreignKey: "idEstado",
    as: "servicios",
  });
};

export { associate };
export default { associate };
