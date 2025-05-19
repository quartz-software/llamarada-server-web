import { HabitacionModel } from "../habitacion/model";
import { EstadoHabitacionModel } from "./model";

const associate = () => {
  EstadoHabitacionModel.hasMany(HabitacionModel, {
    foreignKey: "idEstado",
    as: "habitaciones",
  });
};

export { associate };
export default { associate };
