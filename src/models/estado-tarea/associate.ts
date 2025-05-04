import { TareaModel } from "../tarea/model";
import { EstadoTareaModel } from "./model";

const associate = () => {
  EstadoTareaModel.hasMany(TareaModel, {
    foreignKey: "idEstado",
    as: "tareas",
  });
};

export { associate };
export default { associate };
