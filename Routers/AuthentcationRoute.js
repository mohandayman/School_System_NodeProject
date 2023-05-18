const express = require("express")
const AuthentcationController = require("../Controllers/AuthentcationController")
const router = express.Router()
router.route("/Login")
.post(AuthentcationController.Authentcation)
module.exports=router