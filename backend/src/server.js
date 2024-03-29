import "./loadEnv.js";
import express from "express";
import configViewEngine from "./configs/viewEngine.js";
import initWebRoutes from "./routes/web.js";

const app = express();
const PORT = process.env.PORT || 8080;

// config view engine
configViewEngine(app);

// init web route
initWebRoutes(app);
console.log(process.env.PORT);
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}!`);
});
