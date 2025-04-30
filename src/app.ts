import Express from "express";
import path from "path";
import cors from "cors";
import router from "./router";
import uploads from "./routes/uploads";
import cookieParser from "cookie-parser";
import env from "dotenv";
env.config();

const app = Express();

app.use(cookieParser());
app.use(Express.json());
app.use(cors());
app.use(Express.static(path.join(__dirname, "dist")));
app.use("/api", router);
app.use("/uploads", uploads);

export default app;
