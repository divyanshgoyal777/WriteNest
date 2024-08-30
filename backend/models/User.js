const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    default: "",
  },
  paymentDetails: {
    totalAmount: {
      type: String,
      default: "$0.00",
    },
  },
});

module.exports = mongoose.model("User", UserSchema);
