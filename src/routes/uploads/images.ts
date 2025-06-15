import { Router } from "express";
import UploadController from "../../controllers/upload";
const ImageRouter = Router();

ImageRouter.get("/:image", UploadController.get["/"]);

export default ImageRouter;
export { ImageRouter };
