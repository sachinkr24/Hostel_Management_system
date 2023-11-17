const express = require("express");
const {
    postNoticeController,getNoticesController
} = require("../controllers/uploadController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();


router.post("/postNotice",
 authMiddleware,
 postNoticeController); 

router.get(
  "/getNotice",
   authMiddleware,
  getNoticesController
);


module.exports = router;