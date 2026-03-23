const Task = require("../models/taskModel");
const {classifyTask} = require("../services/aiService")

exports.createTask = async (req,res,next)=>{
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    next(error)
  }
};

exports.getTasks = async (req,res,next)=>{
  try {
    const tasks = await Task.find().sort({createdAt: -1});
    res.json(tasks);
  } catch (error) {
    next(error)
  }
};

exports.getTaskById = async (req,res,next)=>{
  try {
    const task = await Task.findById(req.params.id);
    if(!task){
      return res.status(404).json({message: "Task not found"})
    }
    res.json(task)
  } catch (error) {
    next(error)
  }
};

exports.updateTask = async (req,res,next)=>{
  try {
    const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new:true , runValidators:true}
  )
  if(!task){
    return res.status(404).json({message : "Task not found"})
  }
  res.json(task)
  } catch (error) {
    next(error)
  }
};

exports.deleteTask = async (req,res,next)=>{
  try {
    const task = await Task.findByIdAndDelete(req.params.id)
    if(!task){
      return res.status(404).json({message : "Task not found"})
    }
    res.json({message : "Task Deleted"})
  } catch (error) {
    next(error)
  }
};

exports.classify = async (req, res, next) => {
  try {
    const { description } = req.body;
    if(!description){
      return res.status(400).json({message : "Description is required"})
    }
    const result = await classifyTask(description);
    res.json(result);
  } catch (error) {
    next(error)
  }
};
