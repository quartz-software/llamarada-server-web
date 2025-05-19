import { Model } from "sequelize";
import { sequelize } from "../index";
import Attributes from "./attributes";
import { Attributes as Attr, CreationAttributes, Entity, TableName } from ".";
import { Pago } from "../../types/db/pago";

class DetallePagoModel
  extends Model<Attr, CreationAttributes>
  implements Entity
{
  declare id: number;
  declare concepto: string;
  declare monto: number;
  declare pagado: boolean;
  declare idPago: number;
  declare pago?: Pago | undefined;
}

DetallePagoModel.init(Attributes, {
  sequelize,
  tableName: TableName,
  timestamps: false,
});

export { DetallePagoModel };
export default { DetallePagoModel };
