import { Router } from "express";
import TaskController from "../../controllers/tarea";
const router = Router();

router.get("/", TaskController.get["/"]);
router.get("/:id", TaskController.get["/:id"]);
router.post("/", TaskController.post["/"]);
router.put("/:id", TaskController.put["/:id"]);
router.delete("/:id", TaskController.delete["/:id"]);

export default router;
