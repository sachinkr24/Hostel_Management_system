const express = require("express");
const {getAllUsersController,getAllDoctorsController}= require("../controllers/adminCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

//router onject
const router = express.Router();

//routes
router.get("/getAllUsers", authMiddleware, getAllUsersController);
router.get("/getAllDoctors", authMiddleware, getAllDoctorsController);


module.exports = router;