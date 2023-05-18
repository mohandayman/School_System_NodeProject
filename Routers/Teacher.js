const express = require("express");
const Controller  = require("../Controllers/TeacherController")
const routers = express.Router();
routers
  .route("/Teacher")
  .get(Controller.GetTeacher)
  .post(Controller.AddTeacher)
  .patch(Controller.UpdateTeacher)
  .delete(Controller.DeleteTeacher);
  routers.route("/Teacher/:_id")
  .get(Controller.GetOneTeacher)
module.exports = routers;
