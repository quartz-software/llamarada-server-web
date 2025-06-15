import { Router } from "express";
import EmployeeController from "../../controllers/empleado";
import auth from "../../middlewares/auth";
import permission from "../../middlewares/permission";

const router = Router();
router.use(auth);
router.use(permission("administrador"));
router.get("/", EmployeeController.get["/"]);
router.get("/:id", EmployeeController.get["/:id"]);
router.post("/", EmployeeController.post["/"]);
router.put("/:id", EmployeeController.put["/:id"]);
router.delete("/:id", EmployeeController.delete["/:id"]);

export default router;
