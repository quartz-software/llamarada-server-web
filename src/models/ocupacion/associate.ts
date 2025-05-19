import { HabitacionModel } from "../habitacion/model";
import { OcupacionModel } from "./model";

const associate = () => {
  OcupacionModel.belongsTo(HabitacionModel, {
    foreignKey: "idHabitacion",
    as: "habitacion",
  });
};

export { associate };
export default { associate };
