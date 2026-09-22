const Task = require("../models/Task");
const User = require("../models/user");
const nodemailer = require("nodemailer");
const dns = require("dns");
require("dotenv").config();

// Prefer IPv4: Node's default "verbatim" order makes dns.lookup return IPv6
// first; Nodemailer falls back to that after resolve4 fails, and IPv6:587 is
// refused on this network.
if (typeof dns.setDefaultResultOrder === "function") {
  dns.setDefaultResultOrder("ipv4first");
}

const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
const smtpPort = Number(process.env.SMTP_PORT) || 587;
const smtpSecure =
  String(process.env.SMTP_SECURE).toLowerCase() === "true" ||
  process.env.SMTP_PORT === "465";

// AVG Web/Mail Shield MITMs SMTP TLS with its own CA; Node rejects that chain
// unless verification is relaxed (or the AVG root is added to Node's trust store).
const rejectUnauthorized =
  String(process.env.SMTP_TLS_REJECT_UNAUTHORIZED || "false").toLowerCase() ===
  "true";

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpSecure,
  auth: {
    user: process.env.EMAIL_USER,
    pass: (process.env.EMAIL_PASS || "").replace(/\s/g, ""),
  },
  tls: { rejectUnauthorized },
});

const sendTaskEmail = async (email, task, supervisorName) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "New Task Assigned to You",
    html: `
          <p><strong>Task Title:</strong> ${task.title}</p>
          <p><strong>Description:</strong> ${task.description}</p>
          <p><strong>Assigned By:</strong> ${supervisorName}</p>
          <p>Please check your task dashboard for details.</p>
      `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent to:", email);
  } catch (error) {
    console.error("Error sending email:", error);
    if (error.code === "EAUTH") {
      console.error(
        "Gmail rejected login. Use a Google App Password (not your normal password) in EMAIL_PASS. See https://support.google.com/accounts/answer/185833"
      );
    }
  }
};


const createTask = async (req, res) => {
  try {
    const { title, description, assignedTo } = req.body;

    const assignedUser = await User.findOne({ email: assignedTo });
    if (!assignedUser) {
      return res.status(400).json({ message: "Assigned user not found" });
    }

    const supervisor = await User.findById(req.user.id);
    if (!supervisor) {
      return res.status(400).json({ message: "Supervisor not found" });
    }

  
    const task = await Task.create({
      title,
      description,
      assignedTo: { userId: assignedUser._id, email: assignedUser.email },
      createdBy: supervisor._id, 
    });

    await sendTaskEmail(assignedTo, task, supervisor.name);

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

