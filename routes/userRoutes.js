const express = require("express");
const {
  userAppointmentsController,
  loginController,
  registerController,
  authController,
  applywardenController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllwardensController,
  bookAppointmentController,
  uploadFile,
  bookingAvailabilityController,
  complaintController,
  getallcomplaintcontroller,

} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");
const { imageController, getImage } = require("../controllers/imageCtrl");

//router onject
const router = express.Router();


router.post("/login", loginController);


router.post("/register", registerController);

// /path(posting req), authMiddleware(getting token), authController(getting response))

router.post("/getUserData", authMiddleware, authController);


router.post("/apply-warden", authMiddleware, applywardenController);

router.post("/addcomp",complaintController);

router.post("/file/upload",upload.single('file'),imageController);

router.get("/getcomp",getallcomplaintcontroller);

router.get("/file/:filename",getImage);


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
  "/getAllwardens",
  authMiddleware,
  getAllwardensController
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

router.post("/upload",
 authMiddleware,
  uploadFile); // Add the route for file upload

router.get(
  "/user-appointments",
  authMiddleware,
  userAppointmentsController
);


module.exports = router;