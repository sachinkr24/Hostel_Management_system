const express = require("express");
const colors = require("colors");
const moragan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const uploadRoute = require('./routes/uploadRoute');
const bodyParser = require('body-parser');
//dotenv conig
dotenv.config();

//mongodb connection
connectDB();

//rest obejct
const app = express();


app.use(bodyParser.urlencoded({extended : true}));

app.use(express.urlencoded({ extended: true }));

//middlewares
app.use(express.json()); 
app.use(moragan("dev"));  // logging HTTP requests 
// displays concise output with the HTTP method, status, response time, 
//and request URL. This is often used during development to easily see incoming requests and their details.

//routes
// app.use('/uploads', express.static('uploads')); // Serve uploaded files statically
// app.use('/api', uploadRoute);


app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use("/api/v1/warden", require("./routes/wardenRoutes"));
app.use("/api/v1/notice", require("./routes/uploadRoute"));

//port
const port = process.env.PORT || 8080;
//listen port
app.listen(port, () => {
  console.log(
    `Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
      .bgCyan.white
  );
});