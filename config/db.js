//db.js

require('dotenv').config();

const mongoose = require('mongoose')

const connectDB=async()=>{

    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log(`connected db ${mongoose.connection.host}`.bgGreen.white)
    }catch(error){
        console.log(`issue ${error}`)
    }
}


// module.exports = connectDB;
// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//     console.log(`Connected to MongoDB`.bgGreen.white);
//   } catch (error) {
//     console.log(`MongoDB connection error: ${error.message}`.bgRed.white);
//     process.exit(1);
//   }
// };

module.exports = connectDB;