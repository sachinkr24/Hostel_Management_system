const express = require("express");
const {getAllUsersController,getAllDoctorsController,changeAccountStatusController}= require("../controllers/adminCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

//router onject
const router = express.Router();

//routes
router.get("/getAllUsers", authMiddleware, getAllUsersController);
router.get("/getAllDoctors", authMiddleware, getAllDoctorsController);
//post account status

router.post("/changeAccountStatus", authMiddleware, changeAccountStatusController);
module.exports = router;  