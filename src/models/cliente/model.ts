import { Model } from "sequelize";
import { sequelize } from "../index";
import Attributes from "./attributes";
import { Attributes as Attr, CreationAttributes, Entity, TableName } from ".";
import { Reserva } from "../../types/reserva";
import { Usuario } from "../../types/usuario";

class ClienteModel extends Model<Attr, CreationAttributes> implements Entity {
  declare id: number;
  declare dni: string;
  declare nombre1: string;
  declare nombre2?: string;
  declare apellido1: string;
  declare apellido2?: string;
  declare telefono?: string | undefined;
  declare pais: string;
  declare idUsuario: number;
  declare usuario?: Usuario | undefined;
  declare reservas?: Reserva[] | undefined;
}

ClienteModel.init(Attributes, {
  sequelize,
  tableName: TableName,
  timestamps: false,
});

export { ClienteModel };
export default { ClienteModel };
