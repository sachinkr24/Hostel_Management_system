const wardenModel = require("../models/wardenModel");
const userModel = require("../models/userModels");

const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({
      success: true,
      message: "users data list",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "erorr while fetching users",
      error,
    });
  }
};

const getAllwardensController = async (req, res) => {
  try {
    const wardens = await wardenModel.find({});
    res.status(200).send({
      success: true,
      message: "wardens Data list",
      data: wardens,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while getting wardens data",
      error,
    });
  }
};

// warden account status
const changeAccountStatusController = async (req, res) => {
  try {
    const { wardenId, status } = req.body;
    const warden = await wardenModel.findByIdAndUpdate(wardenId, { status });
    const user = await userModel.findOne({ _id: warden.userId });
    const notification = user.notification;
    notification.push({
      type: "warden-account-request-updated",
      message: `Your warden Account Request Has ${status} `,
      onClickPath: "/notification",
    });
    user.iswarden=status === "approved" ? true : false;
    await user.save();
    res.status(201).send({
      success: true,
      message: "Account Status Updated",
      data: warden,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Account Status",
      error,
    });
  }
};

module.exports = {
  getAllwardensController,
  getAllUsersController,
  changeAccountStatusController,
};