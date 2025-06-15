import { Router } from "express";
import ReservaController from "../../controllers/reserva";
const router = Router();

router.get("/", ReservaController.get["/"]);
router.get("/:id", ReservaController.get["/:id"]);
router.get("/available", ReservaController.get["/rooms"]);
router.post("/accept/:id", ReservaController.post["/accept/:id"]);
router.post("/", ReservaController.post["/"]);
router.put("/:id", ReservaController.put["/:id"]);
router.delete("/:id", ReservaController.delete["/:id"]);

export default router;
