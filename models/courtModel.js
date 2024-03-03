const mongoose = require("mongoose");

const courtSchema = mongoose.Schema({
  name: {
    type: String,
  },
  type: {
    type: String,
  },
  address1: {
    type: String,
  },
  address2: {
    type: String,
  },
  address3: {
    type: String,
  },
  location: {
    type: String,
  },
  landmark: {
    type: String,
  },
  pin: {
    type: String,
  },
  contactNumber: {
    type: String,
  },
  courtPics: {
    type: Array,
  },
  timeStamp: {
    type: Date,
    default: new Date(),
  },
});

const court = mongoose.model("courts", courtSchema);
module.exports = court;
