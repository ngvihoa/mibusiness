import "dotenv/config.js";
import express from "express";
import configViewEngine from "./configs/viewEngine.js";
import initWebRoutes from "./routes/web.js";

const app = express();
const PORT = process.env.PORT || 8080;

// config view engine
configViewEngine(app);

// init web route
// handle request the route from browser
initWebRoutes(app);

// start server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}!`);
});
