import express from "express";
import authController from "../controller/authController.js";
import userController from "../controller/userController.js";
import groupController from "../controller/groupController.js";
import { checkPermission, checkToken } from "../middleware/jwt.action.js";

const router = express.Router();

/**
 *
 * @param {*} app - express app
 */

const initApiRoutes = (app) => {
  router.all("*", checkToken, checkPermission);

  // rest api
  router.post("/signup", authController.handleSignUp);
  router.post("/login", authController.handleLogIn);
  router.post("/logout", authController.handleLogOut);

  router.post("/user/create", userController.createFunc); // C
  router.get("/user/read", userController.readFunc); // R
  router.put("/user/update", userController.updateFunc); // U
  router.delete("/user/delete", userController.deleteFunc); // D

  router.get("/group/read", groupController.readFunc); // R

  // setup base url route
  return app.use("/api/v1", router);
};

export default initApiRoutes;
