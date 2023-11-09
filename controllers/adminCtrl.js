const userModel = require("../models/userModels");
const doctorModel = require("../models/doctorModel");



const getAllUsersController=async(req,res)=>{
    try {
        const users = await userModel.find({})
        res
        .status(200)
        .send({ message: "Users Data", success: true , data : users});
        
    } catch (error) {
        console.log(error);
    res.status(500).send({
      success: false,
      message: `Error while fetching users `,
    });
        
    }
}
const getAllDoctorsController=async(req,res)=>{
    try {
        const doctors = await doctorModel.find({})
        res
        .status(200)
        .send({ message: "Doctors Data", success: true , data : doctors});
        
    } catch (error) {
        console.log(error);
    res.status(500).send({
      success: false,
      message: `Error while fetching doctors `,
    });
        
    }
}

module.exports = {
    getAllUsersController,
    getAllDoctorsController
  };