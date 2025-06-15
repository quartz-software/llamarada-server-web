import { Router } from "express";
import ClientController from "../../controllers/cliente";
import auth from "../../middlewares/auth";
import permission from "../../middlewares/permission";
const router = Router();

router.use(auth);
router.use(permission("administrador"));
router.get("/", ClientController.get["/"]);
router.get("/:id", ClientController.get["/:id"]);
router.post("/", ClientController.post["/"]);
router.put("/:id", ClientController.put["/:id"]);
router.delete("/:id", ClientController.delete["/:id"]);

export default router;
