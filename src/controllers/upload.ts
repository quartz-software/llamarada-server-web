import { NextFunction, Request, Response } from "express";
import path from "node:path";
import { z } from "zod";
const UploadController = {
  get: {
    "/": async (req: Request, res: Response, next: NextFunction) => {
      try {
        const image = z.string().safeParse(req.params.image);
        if (!image.success) {
          next({ status: 400 });
          return;
        }
        const imagePath = path.resolve("uploads/images", image.data);

        res.sendFile(imagePath, (err) => {
          if (err) {
            res.status(404).json({ error: "Image not found" });
          }
        });
      } catch (e) {
        next(e);
      }
    },
  },
};

export default UploadController;
export { UploadController };
