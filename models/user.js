const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false }, 
    verificationToken: { type: String },
  },{
    timestamps:true
  });
  
  module.exports = mongoose.model("User", UserSchema, "user");
  