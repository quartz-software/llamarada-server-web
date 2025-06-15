import Express from "express";
import path from "path";
import cors from "cors";
import ApiRouter from "./routes/api";
import UploadRouter from "./routes/uploads/";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error-handler";

const app = Express();
// @ts-ignore
app.use(cookieParser());
app.use(Express.json());
app.use(cors());
app.use(Express.static(path.join(__dirname, "dist")));
app.use("/api", ApiRouter);
app.use("/uploads", UploadRouter);
app.use(errorHandler);

export default app;
