import "dotenv/config.js";
import express from "express";
import configViewEngine from "./config/viewEngine.js";
import initWebRoutes from "./routes/web.js";
import bodyParser from "body-parser";
// import connection from "./config/connectDB.js";

const app = express();
const PORT = process.env.PORT || 8080;

// config view engine
configViewEngine(app);

//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// init web route
// handle request the route from browser
initWebRoutes(app);

// test connection
connection();
// start server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}!`);
});
