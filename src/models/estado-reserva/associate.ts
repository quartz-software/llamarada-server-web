import { ReservaModel } from "../reserva/model";
import { EstadoReservaModel } from "./model";

const associate = () => {
  EstadoReservaModel.hasMany(ReservaModel, {
    foreignKey: "idEstado",
    as: "reservas",
  });
};

export { associate };
export default { associate };
