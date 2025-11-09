import api from "../api";

// CREATE new task
export const createTask = async (data) => {
  const res = await api.post("/tasks", data);
  return res.data;
};

// GET all tasks (with optional search/filter)
export const getTasks = async (params = {}) => {
  const res = await api.get("/tasks", { params });
  return res.data;
};

// UPDATE task
export const updateTask = async (id, data) => {
  const res = await api.put(`/tasks/${id}`, data);
  return res.data;
};

// DELETE task
export const deleteTask = async (id) => {
  const res = await api.delete(`/tasks/${id}`);
  return res.data;
};
