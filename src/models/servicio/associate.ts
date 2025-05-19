import { TipoServicioModel } from "../tipo-servicio/model";
import { ServicioSolicitadoModel } from "../servicio-solicitado/model";
import { PromocionServicioModel } from "../promocion-servicio/model";
import { HabitacionModel } from "../habitacion/model";
import { ServicioModel } from "./model";
import { ServicioHabitacionModel } from "../servicio-habitacion/model";

const associate = () => {
  ServicioModel.belongsTo(TipoServicioModel, {
    foreignKey: "idTipoServicio",
    as: "tipoServicio",
  });

  ServicioModel.hasMany(ServicioSolicitadoModel, {
    foreignKey: "idServicio",
    as: "serviciosSolicitados",
  });

  ServicioModel.hasMany(PromocionServicioModel, {
    foreignKey: "idServicio",
    as: "promociones",
  });

  ServicioModel.belongsToMany(HabitacionModel, {
    foreignKey: "idServicio",
    as: "habitaciones",
    through: ServicioHabitacionModel,
  });
};

export { associate };
export default { associate };
