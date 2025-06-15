import { Router } from "express";
import ServicioController from "../../controllers/servicio";
import permission from "../../middlewares/permission";
import auth from "../../middlewares/auth";
const router = Router();

router.get("/", ServicioController.get["/"]);

router.use(auth);
router.use(permission("administrador"));
router.get("/:id", ServicioController.get["/:id"]);
router.post("/", ServicioController.post["/"]);
router.put("/:id", ServicioController.put["/:id"]);
router.delete("/:id", ServicioController.delete["/:id"]);

export default router;
