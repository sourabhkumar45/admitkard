const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  courseLevel: {
    type: String,
    required: true,
    enum: ["PG", "UG"],
  },
  country: {
    type: String,
    required: true,
    enum: [
      "USA",
      "Australia",
      "New-Zealand",
      "Canada",
      "UK",
      "Ireland",
      "Germany",
    ],
  },
  dob: {
    type: String,
  },
});

let userModel = mongoose.model("admitkard-users", userSchema);
module.exports = userModel;
