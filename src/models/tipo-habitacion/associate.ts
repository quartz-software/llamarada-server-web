import { HabitacionModel } from "../habitacion/model";
import { TipoHabitacionModel } from "./model";

const associate = () => {
  TipoHabitacionModel.hasMany(HabitacionModel, {
    foreignKey: "idTipoHabitacion",
    as: "habitaciones",
  });
};

export { associate };
export default { associate };
