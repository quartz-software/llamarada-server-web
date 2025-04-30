import { Router } from "express";
import AdditionalServiceController from "../controllers/additional-service-controller.ts/index.js";
const router = Router();

router.get("/", AdditionalServiceController.findAll);
router.post("/", AdditionalServiceController.create);
router.get("/:id", AdditionalServiceController.findOne);
router.put("/:id", AdditionalServiceController.update);
router.delete("/:id", AdditionalServiceController.delete);

export default router;
