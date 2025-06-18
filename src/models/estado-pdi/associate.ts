import { ImagenPDIModel } from "../imagen-pdi/model";
import { EstadoPDIModel } from "./model";

const associate = () => {
  EstadoPDIModel.hasMany(ImagenPDIModel, {
    foreignKey: "idEstado",
    as: "imagenes",
  });
};

export { associate };
export default { associate };
