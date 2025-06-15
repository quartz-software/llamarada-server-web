import { Router } from "express";
import AvailabilityController from "../../controllers/ocupacion";
const router = Router();

router.get("/", AvailabilityController.get["/"]);
// router.post("/", AvailabilityController.);
router.get("/:id", AvailabilityController.get["/:id"]);
router.put("/:id", AvailabilityController.put["/:id"]);
router.delete("/:id", AvailabilityController.delete["/:id"]);

export default router;
