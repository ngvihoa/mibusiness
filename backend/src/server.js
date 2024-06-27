import "dotenv/config.js";
import express from "express";
import initApiRoutes from "./routes/api.js";
import bodyParser from "body-parser";
import connection from "./config/connectDB.js";
import configCors from "./config/cors.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 8080;

// config CORS
configCors(app);

//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//config cookie parser
app.use(cookieParser());

// init web route
// handle request the route from browser
initApiRoutes(app);

// test connection to database
connection();

app.use((req, res) => {
  return res.send("404 Not Found");
});

// start server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}!`);
});
