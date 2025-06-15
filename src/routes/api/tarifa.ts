import { Router } from "express";
import TarifaController from "../../controllers/tarifa";
const router = Router();

router.get("/", TarifaController.get["/"]);
router.get("/:id", TarifaController.get["/:id"]);
router.post("/", TarifaController.post["/"]);
router.put("/:id", TarifaController.put["/:id"]);
router.delete("/:id", TarifaController.delete["/:id"]);

export default router;
