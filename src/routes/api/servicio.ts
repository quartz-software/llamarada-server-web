import { Router } from "express";
import ServicioController from "../../controllers/servicio";
import permission from "../../middlewares/permission";
const router = Router();

router.get("/", ServicioController.get["/"]);
router.get("/:id", ServicioController.get["/:id"]);
router.use(permission("administrador"));
router.post("/", ServicioController.post["/"]);
router.put("/:id", ServicioController.put["/:id"]);
router.delete("/:id", ServicioController.delete["/:id"]);

export default router;
