import { Router } from "express";
import ImagenHabitacionController from "../../controllers/imagen-habitacion";
import auth from "../../middlewares/auth";
import permission from "../../middlewares/permission";
const router = Router();

router.use(auth);
router.use(permission("administrador"));
router.get("/", ImagenHabitacionController.get["/"]);
router.get("/:id", ImagenHabitacionController.get["/:id"]);
router.post("/", ImagenHabitacionController.post["/"]);
router.put("/:id", ImagenHabitacionController.put["/:id"]);
router.delete("/:id", ImagenHabitacionController.delete["/:id"]);

export default router;
