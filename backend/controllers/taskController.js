const Task = require("../models/taskModel");
const {classifyTask} = require("../services/aiService")

exports.createTask = async (req,res)=>{
  const task = await Task.create(req.body);
  res.json(task);
};

exports.getTasks = async (req,res)=>{
  const tasks = await Task.find();
  res.json(tasks);
};

exports.getTaskById = async (req,res)=>{
  const task = await Task.findById(req.params.id);
  res.json(task)
}

exports.updateTask = async (req,res)=>{
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new:true }
  )
  res.json(task)
}

exports.deleteTask = async (req,res)=>{
  await Task.findByIdAndDelete(req.params.id)
  res.json({ message:"Task deleted" })
}

exports.classify = async (req, res) => {
  try {
    const { description } = req.body;

    const result = await classifyTask(description);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "AI classification failed" });
  }
};
