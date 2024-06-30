import express from "express";
import authController from "../controller/authController.js";
import userController from "../controller/userController.js";
import groupController from "../controller/groupController.js";
import roleController from "../controller/roleController.js";
import { checkPermission, checkToken } from "../middleware/jwt.action.js";

const router = express.Router();

/**
 *
 * @param {*} app - express app
 */

const initApiRoutes = (app) => {
  router.all("*", checkToken, checkPermission);

  // auth routes
  router.post("/signup", authController.handleSignUp);
  router.post("/login", authController.handleLogIn);
  router.post("/logout", authController.handleLogOut);

  // user routes
  router.post("/user/create", userController.createFunc); // C
  router.get("/user/read", userController.readFunc); // R
  router.put("/user/update", userController.updateFunc); // U
  router.delete("/user/delete", userController.deleteFunc); // D

  // group routes
  router.get("/group/read", groupController.readFunc); // R
  router.post("/group/create", groupController.createFunc); // C
  router.delete("/group/delete", groupController.deleteFunc); // D

  // role routes
  router.post("/role/create", roleController.createFunc);
  router.get("/role/read", roleController.readFunc);
  router.put("/role/update", roleController.updateFunc);
  router.delete("/role/delete", roleController.deleteFunc);
  router.get("/role/by-group/:groupId", roleController.getRolesByGroup);
  router.post("/role/assign", roleController.assignRoles);

  // setup base url route
  return app.use("/api/v1", router);
};

export default initApiRoutes;
