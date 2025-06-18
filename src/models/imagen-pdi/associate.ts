import { EstadoPDIModel } from "../estado-pdi/model";
import { HabitacionModel } from "../habitacion/model";
import { ImagenPDIModel } from "./model";

const associate = () => {
  ImagenPDIModel.belongsTo(EstadoPDIModel, {
    foreignKey: "idEstado",
    as: "empleados",
  });
  ImagenPDIModel.belongsTo(HabitacionModel, {
    foreignKey: "idHabitacion",
    as: "habitacion",
  });
};

export { associate };
export default { associate };
