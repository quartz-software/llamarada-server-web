import TipoRol from "./tipo-rol/associate";
import EstadoEmpleado from "./estado-empleado/associate";
import Usuario from "./usuario/associate";

function associate() {
  TipoRol.associate();
  EstadoEmpleado.associate();
  Usuario.associate();
}

associate();
export { associate };
export default associate;
