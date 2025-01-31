const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  useId:{type:String},
    user: { type: String, required: true },
    roomid: { type: String, required: true },
    message: { type: String, required: true },
    roomName:{ type: String, required: true }, // Add room field,
  },{
    timestamps:true
  });
  
  module.exports = mongoose.model("Chat", chatSchema);