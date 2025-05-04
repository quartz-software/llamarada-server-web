import { StockModel } from "../stock/model";
import { CategoriaStockModel } from "./model";

const associate = () => {
  CategoriaStockModel.hasMany(StockModel, {
    foreignKey: "idCategoria",
    as: "stocks",
  });
};

export { associate };
export default { associate };
