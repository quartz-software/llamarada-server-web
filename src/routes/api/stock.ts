import { Router } from "express";
import StockController from "../../controllers/stock";
const router = Router();

router.get("/", StockController.get["/"]);
router.get("/:id", StockController.get["/:id"]);
router.post("/", StockController.post["/"]);
router.put("/:id", StockController.put["/:id"]);
router.delete("/:id", StockController.delete["/:id"]);

export default router;
