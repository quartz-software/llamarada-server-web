import { HabitacionModel } from "../habitacion/model";
import { ImagenHabitacionModel } from "./model";

const associate = () => {
  ImagenHabitacionModel.belongsTo(HabitacionModel, {
    foreignKey: "idHabitacion",
    as: "habitacion",
  });
};

export { associate };
export default { associate };
