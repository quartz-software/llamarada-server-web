import { Router } from "express";
import { AuthController } from "../../controllers/auth";
import auth from "../../middlewares/auth";
const router = Router();

router.get("/check", AuthController.get["/check"]);
router.get("/role", auth, AuthController.get["/role"]);
router.post("/login", AuthController.post["/login"]);
router.post("/logout", AuthController.post["/logout"]);
router.post("/register", AuthController.post["/register"]);

export default router;
