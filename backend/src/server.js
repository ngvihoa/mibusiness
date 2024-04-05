import "dotenv/config.js";
import express from "express";
import configViewEngine from "./config/viewEngine.js";
import initWebRoutes from "./routes/web.js";
import bodyParser from "body-parser";
import connection from "./config/connectDB.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: process.env.REACT_URL,
    methods: "GET, POST, OPTIONS, PUT, PATCH, DELETE", // Specify allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

// config headers
// app.use(function (req, res, next) {
//   // Website you wish to allow to connect
//   res.setHeader("Access-Control-Allow-Origin", process.env.REACT_URL);

//   // Request methods you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );

//   // Request headers you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With,content-type"
//   );

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader("Access-Control-Allow-Credentials", true);

//   // Pass to next layer of middleware
//   next();
// });

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
