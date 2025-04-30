import { TipoRolModel } from "../tipo-rol/model";
import { EmpleadoModel } from "./model";

const associate = () => {
  EmpleadoModel.belongsTo(TipoRolModel, {
    foreignKey: "idRol",
    as: "rol",
  });
};

export { associate };
export default { associate };
