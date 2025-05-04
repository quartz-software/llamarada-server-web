import { QueryInterface } from "sequelize";
import { TableName } from ".";
import Attributes from "./attributes";

const up = async (qi: QueryInterface) => {
  await qi.createTable(TableName, Attributes);
};
const down = async (qi: QueryInterface) => {
  await qi.dropTable(TableName);
};

export { up, down };
export default { up, down };
