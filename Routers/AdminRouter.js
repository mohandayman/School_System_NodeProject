const express = require("express");
const router = express.Router();
const AdminControlller = require("../Controllers/AdminController");
const { CheckAdmin } = require("../MiddleWares/AuthentcationMiddleWare");

router
  .route("/Admin")
  .all(CheckAdmin)
  .get(AdminControlller.GetAllAdmins)
  .post(AdminControlller.AddAdmin)
  .delete(AdminControlller.DeleteAdmin);
module.exports = router;
