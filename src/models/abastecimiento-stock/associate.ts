import { StockModel } from "../stock/model";
import { AbastecimientoStockModel } from "./model";

const associate = () => {
  AbastecimientoStockModel.belongsTo(StockModel, {
    foreignKey: "idStock",
    as: "stock",
  });
};

export { associate };
export default { associate };
