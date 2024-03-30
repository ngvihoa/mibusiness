import express from "express";
import homeController from "../controller/homeController.js";

const router = express.Router();

/**
 *
 * @param {*} app - express app
 */
const initWebRoutes = (app) => {
  // define the routes used in website
  // router will dispatch which method use in which route
  router.get("/", homeController.handleHomePage);
  router.get("/user", homeController.handleUserPage);

  // action api
  router.post("/users/create-user", homeController.handleCreateNewUser);

  // setup base url route
  return app.use("/", router);
};

export default initWebRoutes;
