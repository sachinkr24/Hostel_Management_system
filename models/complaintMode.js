const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: false,
    },
    description : {
        type: String,
        rrequired: false,
    },
    picture: {
        type: String,
        required: false,
    },
    createdDate: {
      type: String,
      required: false,
    },
    name: {
        type: String,
        required : false
    },
    hostelName: {
        type: String,
        required :false
    },
}
);

const complaintModel = mongoose.model("complaint", complaintSchema);

module.exports = complaintModel;