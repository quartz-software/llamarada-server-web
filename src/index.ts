import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import appConfig from "./config/app";

const port = appConfig.port || 8000;

app.listen(port, () => {
  console.log(`app listening in http://localhost:${port}`);
});
