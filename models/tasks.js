const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    taskName: { type: String, required: true },
    taskDescription: { type: String, required: true },
    priority: { type: String, default:"low"}, 
  },{
    timestamps:true
  });
  
  module.exports = mongoose.model("Task", TaskSchema);
  