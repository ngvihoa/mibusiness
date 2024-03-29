import express from "express";

const router = express.Router();

/**
 *
 * @param {*} app - express app
 */
const initWebRoutes = (app) => {
  // define the routes used in website
  // router will dispatch which method use in which route
  router.get("/", (req, res, next) => {
    return res.send("Hello World");
  });

  return app.use("/", router);
};

export default initWebRoutes;
