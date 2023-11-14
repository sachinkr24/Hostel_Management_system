const express = require("express");
const {
  getwardenInfoController,
  updateProfileController,
  getwardenByIdController,
  wardenAppointmentsController,
  updateStatusController
} = require("../controllers/wardenCtrl");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/getwardenInfo", authMiddleware, getwardenInfoController);
router.post("/updateProfile", authMiddleware, updateProfileController);
router.post("/getwardenById", authMiddleware, getwardenByIdController);
router.get(
  "/warden-appointments",
  authMiddleware,
  wardenAppointmentsController
);


//updating appointment status
router.post("/update-status", 
authMiddleware, 
updateStatusController);



module.exports = router;