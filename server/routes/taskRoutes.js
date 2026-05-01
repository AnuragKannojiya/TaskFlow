import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import Task from "../models/Task.js";

const router = express.Router();

const asyncHandler = (handler) => (req, res, next) => {
  Promise.resolve(handler(req, res, next)).catch(next);
};

router.use(protect);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const title = req.body.title?.trim();
    const description = req.body.description?.trim() || "";
    const { status } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Task title is required" });
    }

    const task = await Task.create({
      title,
      description,
      status,
      user: req.user._id
    });

    res.status(201).json({ task });
  })
);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ tasks });
  })
);

router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const title = req.body.title?.trim();
    const description = req.body.description?.trim();
    const { status } = req.body;
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (title !== undefined && !title) {
      return res.status(400).json({ message: "Task title cannot be empty" });
    }

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.status = status ?? task.status;

    const updatedTask = await task.save();
    res.json({ task: updatedTask });
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted" });
  })
);

export default router;
