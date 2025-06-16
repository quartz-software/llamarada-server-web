import { HabitacionModel } from "./model";
import { EstadoHabitacionModel } from "../estado-habitacion/model";
import { TipoHabitacionModel } from "../tipo-habitacion/model";
import { ServicioSolicitadoModel } from "../servicio-solicitado/model";
import { ServicioModel } from "../servicio/model";
import { TarifaModel } from "../tarifa/model";
import { OcupacionModel } from "../ocupacion/model";
import { ImagenHabitacionModel } from "../imagen-habitacion/model";
import { ReservaModel } from "../reserva/model";
import { TarifaHabitacionModel } from "../tarifa-habitacion/model";
import { ReservaHabitacionModel } from "../reserva-habitacion/model";
import { ServicioHabitacionModel } from "../servicio-habitacion/model";

const associate = () => {
  HabitacionModel.belongsTo(EstadoHabitacionModel, {
    foreignKey: "idEstadoHabitacion",
    as: "estado",
  });

  HabitacionModel.belongsTo(TipoHabitacionModel, {
    foreignKey: "idTipoHabitacion",
    as: "tipo",
  });

  HabitacionModel.hasMany(ServicioSolicitadoModel, {
    foreignKey: "idHabitacion",
    as: "serviciosSolicitados",
  });

  HabitacionModel.belongsToMany(ServicioModel, {
    foreignKey: "idHabitacion",
    as: "servicioa",
    through: ServicioHabitacionModel,
  });

  HabitacionModel.belongsToMany(TarifaModel, {
    foreignKey: "idHabitacion",
    as: "tarifas",
    through: TarifaHabitacionModel,
  });

  HabitacionModel.hasMany(OcupacionModel, {
    foreignKey: "idHabitacion",
    as: "ocupaciones",
  });

  HabitacionModel.hasMany(ImagenHabitacionModel, {
    foreignKey: "idHabitacion",
    as: "imagenes",
  });

  HabitacionModel.belongsToMany(ReservaModel, {
    foreignKey: "idHabitacion",
    as: "reservas",
    through: ReservaHabitacionModel,
  });
};

export { associate };
export default { associate };
