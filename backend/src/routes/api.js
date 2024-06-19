import express from "express";
import authController from "../controller/authController.js";
import userController from "../controller/userController.js";
import groupController from "../controller/groupController.js";

const router = express.Router();

/**
 *
 * @param {*} app - express app
 */

const testMiddleware = (req, res, next) => {
  console.log("calling middleware");
  next();
};

const initApiRoutes = (app) => {
  // rest api - not return view
  router.get("/test-api", authController.testApi);
  router.post("/signup", authController.handleSignUp);
  router.post("/login", testMiddleware, authController.handleLogIn);

  router.post("/user/create", userController.createFunc); // C
  router.get("/user/read", userController.readFunc); // R
  router.put("/user/update", userController.updateFunc); // U
  router.delete("/user/delete", userController.deleteFunc); // D

  router.get("/group/read", groupController.readFunc); // R

  // setup base url route
  return app.use("/api/v1", router);
};

export default initApiRoutes;
