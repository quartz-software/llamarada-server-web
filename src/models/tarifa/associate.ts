import { TarifaModel } from "./model";
import { HabitacionModel } from "../habitacion/model";
import { TarifaHabitacionModel } from "../tarifa-habitacion/model";

const associate = () => {
  TarifaModel.belongsToMany(HabitacionModel, {
    through: TarifaHabitacionModel,
    foreignKey: "idTarifa",
    as: "habitaciones",
  });
};

export { associate };
export default { associate };
