const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  priority: {
    type: String,
    default: "medium"
  },
  status: {
    type: String,
    default: "todo"
  }
},{timestamps:true})

module.exports = mongoose.model("Task", taskSchema)