import { PagoModel } from "../pago/model";
import { DetallePagoModel } from "./model";

const associate = () => {
  DetallePagoModel.belongsTo(PagoModel, {
    foreignKey: "idPago",
    as: "pago",
  });
};

export { associate };
export default { associate };
