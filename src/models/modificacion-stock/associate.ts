import { EmpleadoModel } from "../empleado/model";
import { StockModel } from "../stock/model";
import { ModificacionStockModel } from "./model";

const associate = () => {
  ModificacionStockModel.belongsTo(EmpleadoModel, {
    foreignKey: "idEmpleado",
    as: "empleado",
  });
  ModificacionStockModel.belongsTo(StockModel, {
    foreignKey: "idStock",
    as: "stock",
  });
};

export { associate };
export default { associate };
