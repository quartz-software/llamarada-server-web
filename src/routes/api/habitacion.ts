import { Router } from "express";
import { HabitacionController } from "../../controllers/habitacion";
import configureMulter from "../../utils/multer";
import auth from "../../middlewares/auth";
import permission from "../../middlewares/permission";
const router = Router();

router.get("/", HabitacionController.get["/"]);
router.get("/:id", HabitacionController.get["/:id"]);

router.use(auth);
router.use(permission("administrador"));
router.post(
  "/",
  //@ts-ignore
  configureMulter("images/").array("images", 5),
  HabitacionController.post["/"]
);
router.put(
  "/:id",
  //@ts-ignore
  configureMulter("images/").array("images", 5),
  HabitacionController.put["/:id"]
);
router.delete("/:id", HabitacionController.delete["/:id"]);

export default router;
