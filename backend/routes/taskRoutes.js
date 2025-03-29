const express = require("express");
const { createTask, getTasks, updateTask, deleteTask,updateTaskStatus } = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getTasks);
router.post("/", authMiddleware, createTask);
router.put("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);
router.put("/:id/status", authMiddleware, updateTaskStatus);

module.exports = router;
