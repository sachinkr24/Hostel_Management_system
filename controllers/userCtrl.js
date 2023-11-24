const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const wardenModel = require("../models/wardenModel");
const appointmentModel = require("../models/appointmentModel");
const complaintModel = require("../models/complaintMode");
const moment = require('moment')

const gfs = require('../config/gridfs');
const Notice = require('../models/NoticeModel');
const upload = require('../config/multer');


const registerController = async (req, res) => {
  try {
    const exisitingUser = await userModel.findOne({ email: req.body.email });
    if (exisitingUser) {
      return res
        .status(200)
        .send({ message: "User Already Exist", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({ message: "Register Sucessfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};

// login callback
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "user not found", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invlid EMail or Password", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({ message: "Login Success", success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
  }
};
//token validation
const authController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res.status(200).send({
        message: "user not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "auth error",
      success: false,
      error,
    });
  }
};

const applywardenController = async (req, res) => {
  try {
    const newwarden = await wardenModel({ ...req.body, status: "pending" });
    await newwarden.save();
    const adminUser = await userModel.findOne({ isAdmin: true });
    const notification = adminUser.notification;
    notification.push({
      type: "apply-warden-request",
      message: `${newwarden.firstName} ${newwarden.lastName} Has Applied For A Warden Account`,
      data: {
        wardenId: newwarden._id,
        name: newwarden.firstName + " " + newwarden.lastName,
        onClickPath: "/admin/wardens",
      },
    });
    await userModel.findByIdAndUpdate(adminUser._id, { notification });
    res.status(201).send({
      success: true,
      message: "Warden Account Applied SUccessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error WHile Applying For warden",
    });
  }
};


const getAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    const seennotification = user.seennotification;
    const notification = user.notification;
    seennotification.push(...notification);
    user.notification = [];
    user.seennotification = notification;
    const updatedUser = await user.save();
    res.status(200).send({
      success: true,
      message: "all notification marked as read",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in notification",
      success: false,
      error,
    });
  }
};


const deleteAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.notification = [];
    user.seennotification = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "Notifications Deleted successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "unable to delete all notifications",
      error,
    });
  }
};

const getAllwardensController = async (req, res) => {
  try {
    const wardens = await wardenModel.find({status:'approved'});
    res.status(200).send({
      success: true,
      message: "wardens data list",
      data: wardens,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "erorr while fetching wardens",
      error,
    });
  }
};

const bookAppointmentController = async (req, res) => {
  try {
    req.body.date = moment(req.body.date, 'DD-MM-YYYY').toISOString()
    req.body.time = moment(req.body.time, 'HH-mm').toISOString()

    req.body.status = "pending";
    const newAppointment = new appointmentModel(req.body);
    await newAppointment.save();
    const user = await userModel.findOne({ _id: req.body.wardenInfo.userId });
    user.notification.push({
      type: "New-appointment-request",
      message: `A new complaint from ${req.body.userInfo.name}`,
      onCLickPath: "/user/appointments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "complaint registered succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While registering complaint ",
    });
  }
};


const bookingAvailabilityController = async (req, res) => {
  try {
    const date = moment(req.body.date, 'DD-MM-YYYY').toISOString()
    const fromTime = moment(req.body.time, 'HH-mm').subtract(1, 'hours').toISOString()
    const toTime = moment(req.body.time, 'HH-mm').add(1, 'hours').toISOString()
    const wardenId = req.body.wardenId
    const appointments = await appointmentModel.find({wardenId,date,time:{
      $gte:fromTime,$lte:toTime
    }
  })
  if(appointments.length > 0){
    return  res.status(200).send({
      success: true,
      message: "Appointment not available",
    });
  }else{
    return  res.status(200).send({
      success: true,
      message: "Appointment  available",
    });

  }
  
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Booking-availability",
    });
  }
};

const uploadFile = upload.single('file');

const handleFileUpload = async (req, res) => {
  try {
    const { file } = req;
    const { title } = req.body;

    // Create write stream to store the file content in GridFS
    const writeStream = gfs.createWriteStream({
      filename: file.originalname,
      metadata: { title },
    });

    // Pipe the file buffer to the write stream
    writeStream.write(file.buffer);
    writeStream.end();

    // Save file metadata to MongoDB
    const notice = new Notice({
      title,
      filename: file.originalname,
    });
    await notice.save();

    res.status(200).json({
      success: true,
      message: 'File uploaded successfully',
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({
      success: false,
      error,
      message: 'Error uploading file',
    });
  }
};





const userAppointmentsController =async(req,res)=>{
  try {
    const appointments = await appointmentModel.find({
      userId: req.body.userId,
    });
    res.status(200).send({
      success: true,
      message: "Users complaints Fetched",
      data: appointments,
    });
  } catch (error) {
    console.log(error); 
    res.status(500).send({
      success: false,
      error,
      message: "Error in user complaints",
    });
  }
}

const complaintController=async(req,res)=>{
  try{
    console.log(req.body);
    const complaint=new complaintModel(req.body);
    complaint.save();
    //FOR SENDING NOTIFICATION
    // const adminUser =await userModel.findOne({isAdmin:true});
    // const notification=adminUser.notification;
    // notification.push({
    //   type: 'compalint',
    //   message: `New complaint from ${complaint.name}`
    // })
    res.status(200).send({
      success: true,
      message:"complaint registered ",
    });

  }
    catch(error){
      console.log(error); 
      res.status(500).send({
        success: false,
        error,
        message: "Error in user complaint",
      });
    }
}

const getallcomplaintcontroller= async(req,res)=>{
  try{
    const complaint = await complaintModel.find({});
    return res.status(200).json({
    isSuccess: true,
    data: complaint
    });
  }
  catch(error){
   res.status(500).json({msg : "hatttttttttt",
  error: error});
  }
}
module.exports = {
  loginController,
  registerController,
  authController,
  applywardenController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllwardensController,
  bookAppointmentController,
  bookingAvailabilityController,
  uploadFile,
  handleFileUpload,
  userAppointmentsController,
  complaintController,
  getallcomplaintcontroller
};