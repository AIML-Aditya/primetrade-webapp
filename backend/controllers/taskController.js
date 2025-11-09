import Task from "../models/Task.js";

// CREATE TASK
export const createTask = async (req, res) => {
  try {
    const { title } = req.body;

    const task = await Task.create({
      title,
      userId: req.user.id, // logged in user
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL TASKS
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE TASK
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title },
      { new: true }
    );

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE TASK
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
