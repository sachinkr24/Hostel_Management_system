const wardenModel = require("../models/wardenModel");
const appointmentModel = require("../models/appointmentModel");
const userModel = require("../models/userModels");
const getwardenInfoController = async (req, res) => {
  try {
    const warden = await wardenModel.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "warden data fetch success",
      data: warden,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Fetching warden Details",
    });
  }
};

// update doc profile
const updateProfileController = async (req, res) => {
  try {
    const warden = await wardenModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(201).send({
      success: true,
      message: "warden Profile Updated",
      data: warden,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "warden Profile Update issue",
      error,
    });
  }
};

const getwardenByIdController = async (req, res) => {
    try {
      const warden = await wardenModel.findOne({ _id: req.body.wardenId });
      res.status(200).send({
        success: true,
        message: "warden info fetched",
        data: warden,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error in fetching single warden's data",
      });
    }
  };
  
  const wardenAppointmentsController = async (req, res) => {
    try {
      const warden = await wardenModel.findOne({ userId: req.body.userId });
      const appointments = await appointmentModel.find({
        wardenId: warden._id,
      });
      res.status(200).send({
        success: true,
        message: "Complaints fetched ",
        data: appointments,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error in Doc Appointments",
      });
    }
  };

  const updateStatusController = async(req,res)=>{
  
      try {
        const { appointmentsId, status } = req.body;
        const appointments = await appointmentModel.findByIdAndUpdate(
          appointmentsId,
          { status }
        );
        const user = await userModel.findOne({ _id: appointments.userId });
        const notification = user.notification;
        notification.push({
          type: "status-updated",
          message: `your complaint status is : ${status}`,
          onCLickPath: "/warden-appointments",
        });
        await user.save();
        res.status(200).send({
          success: true,
          message: "status Updated",
        });
      }
     catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error in updating status",
      });
    }

  }
module.exports = { getwardenInfoController, updateProfileController , getwardenByIdController,wardenAppointmentsController,updateStatusController};