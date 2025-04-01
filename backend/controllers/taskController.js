const Task = require("../models/Task");
const User = require("../models/user");
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
  },
});

// Function to Send Email
const sendTaskEmail = async (email, task) => {
  const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "New Task Assigned to You",
      html: `
          <p><strong>Task Title:</strong> ${task.title}</p>
          <p><strong>Description:</strong> ${task.description}</p>
          <p><strong>Assigned By:</strong> ${task.createdBy}</p>
          <p>Please check your task dashboard for details.</p>
      `,
  };

  try {
      await transporter.sendMail(mailOptions);
      console.log("Email sent to:", email);
  } catch (error) {
      console.error("Error sending email:", error);
  }
};

// Create Task API (Updated)
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
            assignedTo: { userId: assignedUser._id, email: assignedUser.email },
            createdBy: req.user.id,
        });

        // Send Email to Assignee
        await sendTaskEmail(assignedTo, task);

        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("createdBy", "email");
    console.log("Tasks sent to frontend:", tasks);
    res.json(tasks);
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

const updateTaskStatus = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.status = req.body.status || task.status;
    await task.save();
    res.json({ message: "Task status updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask, updateTaskStatus };

