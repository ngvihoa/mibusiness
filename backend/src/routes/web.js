import express from "express";
import homeController from "../controller/homeController.js";

const router = express.Router();

/**
 *
 * @param {*} app - express app
 */
const initWebRoutes = (app) => {
  // define the routes used in website
  // router will dispatch which method use in which route - return view
  router.get("/", homeController.handleHomePage);
  router.get("/user", homeController.handleUserPage);
  router.get("/update-user/:id", homeController.handleUpdateUserPage);

  // action api - return view
  router.post("/users/create-user", homeController.handleCreateNewUser);
  router.post("/users/delete-user/:id", homeController.handleDeleteUser);
  router.post("/users/edit-user", homeController.handleUpdateUser);

  // setup base url route
  return app.use("/", router);
};

export default initWebRoutes;
