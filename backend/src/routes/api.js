import express from "express";
import apiController from "../controller/apiController.js";

const router = express.Router();

/**
 *
 * @param {*} app - express app
 */
const initApiRoutes = (app) => {
  // rest api - not return view
  router.get("/test-api", apiController.testApi);
  router.post("/signup", apiController.handleSignUp);
  router.post("/login", apiController.handleLogIn);

  // setup base url route
  return app.use("/api/v1", router);
};

export default initApiRoutes;
