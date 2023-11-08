require('dotenv').config();

const mongoose = require('mongoose')

const connectDB=async()=>{

    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log(`connected db ${mongoose.connection.host}`)
    }catch(error){
        console.log(`issue ${error}`)
    }
}

module.exports = connectDB;