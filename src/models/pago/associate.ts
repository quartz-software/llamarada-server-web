import { DetallePagoModel } from "../detalle-pago/model";
import { ReservaModel } from "../reserva/model";
import { PagoModel } from "./model";

const associate = () => {
  PagoModel.belongsTo(ReservaModel, {
    foreignKey: "idReserva",
    as: "reserva",
  });
  PagoModel.hasMany(DetallePagoModel, {
    foreignKey: "idPago",
    as: "detalles",
  });
};

export { associate };
export default { associate };
