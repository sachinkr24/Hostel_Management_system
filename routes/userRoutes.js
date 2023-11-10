const express = require("express");
const {
  userAppointmentsController,
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllDoctorsController,
  bookAppointmentController,
  bookingAvailabilityController
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

//router onject
const router = express.Router();


router.post("/login", loginController);


router.post("/register", registerController);


router.post("/getUserData", authMiddleware, authController);


router.post("/apply-doctor", authMiddleware, applyDoctorController);


router.post(
  "/get-all-notification",
  authMiddleware,
  getAllNotificationController
);

router.post(
  "/delete-all-notification",
  authMiddleware,
  deleteAllNotificationController
);

router.get(
  "/getAllDoctors",
  authMiddleware,
  getAllDoctorsController
);

router.post(
  "/book-appointment",
  authMiddleware,
  bookAppointmentController
);

router.post(
  "/booking-availability",
  authMiddleware,
  bookingAvailabilityController
);

router.get(
  "/user-appointments",
  authMiddleware,
  userAppointmentsController
);


module.exports = router;