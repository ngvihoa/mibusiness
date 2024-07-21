import express from "express";
import authController from "../controller/authController.js";
import userController from "../controller/userController.js";
import groupController from "../controller/groupController.js";
import roleController from "../controller/roleController.js";
import { checkPermission, checkToken } from "../middleware/jwt.action.js";
import projectController from "../controller/projectController.js";

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
  router.post("/user", userController.createFunc);
  router.get("/user", userController.readFunc);
  router.put("/user", userController.updateFunc);
  router.delete("/user", userController.deleteFunc);

  // group routes
  router.get("/group", groupController.readFunc);
  router.post("/group", groupController.createFunc);
  router.put("/group", groupController.updateFunc);
  router.delete("/group", groupController.deleteFunc);

  // role routes
  router.post("/role", roleController.createFunc);
  router.get("/role", roleController.readFunc);
  router.put("/role", roleController.updateFunc); // not implement yet
  router.delete("/role", roleController.deleteFunc);
  router.get("/role/byGroup/:groupId", roleController.getRolesByGroup);
  router.post("/role/assign", roleController.assignRoles);

  // project routes
  router.get("/project", projectController.readFunc);
  router.post("/project", projectController.createFunc);
  router.put("/project", projectController.updateFunc);
  router.delete("/project", projectController.deleteFunc);

  // setup base url route
  return app.use("/api/v1", router);
};

export default initApiRoutes;
