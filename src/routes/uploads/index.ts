import { Router } from "express";
import ImageRouter from "./images";

const UploadRouter = Router();
UploadRouter.use("/images", ImageRouter);

export default UploadRouter;
export { UploadRouter };
