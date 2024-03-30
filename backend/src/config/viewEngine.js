import express from "express";

/**
 *
 * @param {*} app - express app
 */
const configViewEngine = (app) => {
  app.use(express.static("./src/public"));

  app.set("view engine", "ejs"); // tech to write HTML with node
  app.set("views", "./src/views"); // where to store files
};

export default configViewEngine;
