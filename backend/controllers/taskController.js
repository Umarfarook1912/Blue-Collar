const Task = require("../models/Task");
const User = require("../models/user");
const createTask = async (req, res) => {
  try {
    const { title, description, assignedTo } = req.body;

    const assignedUser = await User.findOne({ email: assignedTo });

    if (!assignedUser) {
      return res.status(400).json({ message: "Assigned user not found" });
    }

    const task = await Task.create({
      title,
      description,
      assignedTo: { userId: assignedUser._id, email: assignedUser.email }, // Store both ID and email
      createdBy: req.user.id, // User who created the task
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("createdBy", "email"); // Populate createdBy
    console.log("Tasks sent to frontend:", tasks); // Debugging output
    res.json(tasks); // Ensure an array is sent
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
      const { title, description, assignedTo } = req.body;
      const task = await Task.findById(req.params.id);
      if (!task) return res.status(404).json({ message: "Task not found" });

      const assignedUser = await User.findOne({ email: assignedTo });
      if (!assignedUser) return res.status(400).json({ message: "Assigned user not found" });

      task.title = title;
      task.description = description;
      task.assignedTo = { userId: assignedUser._id, email: assignedUser.email };

      await task.save();
      res.json(task);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
      await Task.findByIdAndDelete(req.params.id);
      res.json({ message: "Task deleted successfully" });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
