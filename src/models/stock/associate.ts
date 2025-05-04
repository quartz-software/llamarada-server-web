import { AbastecimientoStockModel } from "../abastecimiento-stock/model";
import { CategoriaStockModel } from "../categoria-stock/model";
import { ModificacionStockModel } from "../modificacion-stock/model";
import { StockModel } from "./model";

const associate = () => {
  StockModel.belongsTo(CategoriaStockModel, {
    foreignKey: "idCategoria",
    as: "categoria",
  });
  StockModel.hasMany(AbastecimientoStockModel, {
    foreignKey: "idStock",
    as: "abastecimientos",
  });
  StockModel.hasMany(ModificacionStockModel, {
    foreignKey: "idStock",
    as: "modificaciones",
  });
};

export { associate };
export default { associate };
