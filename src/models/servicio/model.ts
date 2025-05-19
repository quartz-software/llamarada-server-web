import { Model } from "sequelize";
import { sequelize } from "../index";
import Attributes from "./attributes";
import { Attributes as Attr, CreationAttributes, Entity, TableName } from ".";
import { Habitacion } from "../../types/habitacion";
import { PromocionServicio } from "../../types/promocion-servicio";
import { ServicioSolicitado } from "../../types/servicio-solicitado";
import { TipoServicio } from "../../types/tipo-servicio";

class ServicioModel extends Model<Attr, CreationAttributes> implements Entity {
  declare id: number;
  declare nombre: string;
  declare descripcion?: string | undefined;
  declare restricciones?: string | undefined;
  declare precio: number;
  declare moneda: string;
  declare horaApertura: string;
  declare horaCierre: string;
  declare disponible: boolean;
  declare idTipoServicio: number;
  declare tipoServicio?: TipoServicio | undefined;
  declare serviciosSolicitados?: ServicioSolicitado[] | undefined;
  declare promociones?: PromocionServicio[] | undefined;
  declare habitaciones?: Habitacion[] | undefined;
}

ServicioModel.init(Attributes, {
  sequelize,
  tableName: TableName,
  timestamps: false,
});

export { ServicioModel };
export default { ServicioModel };
