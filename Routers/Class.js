const { response } = require("express");
const express = require("express");
const Controller = require("../Controllers/ClassController");
const routers = express.Router();
routers
  .route("/Classes")
  .get(Controller.GetClasses)
  .post(Controller.AddClass)
  .patch(Controller.UpdateClass)
  .delete(Controller.DeleteClass);
routers
  .route("/Classes/:Id")
  .get(Controller.GetClassByBody)
  .post(Controller.AddClassBybody);
module.exports = routers;
