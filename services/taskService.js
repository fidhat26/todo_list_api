
const Task = require('../models/Task');

const getAllTasks = async () => {
  return await Task.find().sort({ createdAt: -1 });
};

const createTask = async (taskData) => {
  return await Task.create(taskData);
};

const updateTask = async (id, taskData) => {
  return await Task.findByIdAndUpdate(id, taskData, {
    new: true,
    runValidators: true,
  });
};

const deleteTask = async (id) => {
  return await Task.findByIdAndDelete(id);
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};
