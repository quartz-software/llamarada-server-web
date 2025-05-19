import { ServicioModel } from "../servicio/model";
import { TipoServicioModel } from "./model";

const associate = () => {
  TipoServicioModel.hasMany(ServicioModel, {
    foreignKey: "idTipoServicio",
    as: "servicios",
  });
};

export { associate };
export default { associate };
