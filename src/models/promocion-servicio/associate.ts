import { ServicioModel } from "../servicio/model";
import { PromocionServicioModel } from "./model";

const associate = () => {
  PromocionServicioModel.belongsTo(ServicioModel, {
    foreignKey: "idServicio",
    as: "servicio",
  });
};

export { associate };
export default { associate };
