import TipoRol from "./tipo-rol/associate";
import EstadoEmpleado from "./estado-empleado/associate";
import Usuario from "./usuario/associate";
import ModificacionStock from "./modificacion-stock/associate";
import CategoriaStock from "./categoria-stock/associate";
import Stock from "./stock/associate";
import AbastecimientoStock from "./abastecimiento-stock/associate";

function associate() {
  TipoRol.associate();
  EstadoEmpleado.associate();
  Usuario.associate();
  ModificacionStock.associate();
  CategoriaStock.associate();
  Stock.associate();
  AbastecimientoStock.associate();
}

associate();
export { associate };
export default associate;
