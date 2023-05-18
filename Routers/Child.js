const express = require("express");
const Controller = require("../Controllers/ChildController");
const { CheckChild } = require("../MiddleWares/AuthentcationMiddleWare");
const routers = express.Router();
routers
  .route("/Children/")
  .all(CheckChild)
  .get(Controller.GetChildren)
  .post(Controller.AddChild)
  .patch(Controller.UpdateChild)
  .delete(Controller.DeleteChild);

routers.route("/Children/:id?").get(Controller.GetChild);
module.exports = routers;
