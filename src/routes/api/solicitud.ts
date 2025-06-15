import { Router } from "express";
import AdditionalServiceController from "../../controllers/servicio-solicitado";
const router = Router();

router.get("/", AdditionalServiceController.get["/"]);
router.post("/", AdditionalServiceController.post["/"]);
router.get("/:id", AdditionalServiceController.get["/:id"]);
router.put("/:id", AdditionalServiceController.put["/:id"]);
router.delete("/:id", AdditionalServiceController.delete["/:id"]);

export default router;
