// frontend/src/api/taskAPI.js
import api from "./axios";

/**
 * Get tasks (optionally accepts params: { q, status, tag })
 * @param {Object} params
 * @returns {Promise<Array>}
 */
export async function getTasks(params = {}) {
  const res = await api.get("/tasks", { params });
  return res.data;
}

/**
 * Create a new task
 * @param {{title:string, description?:string, status?:string, tags?:string[]}} payload
 * @returns {Promise<Object>}
 */
export async function createTask(payload) {
  const res = await api.post("/tasks", payload);
  return res.data;
}

/**
 * Get single task by id
 * @param {string} id
 * @returns {Promise<Object>}
 */
export async function getTask(id) {
  const res = await api.get(`/tasks/${id}`);
  return res.data;
}

/**
 * Update a task
 * @param {string} id
 * @param {Object} payload
 * @returns {Promise<Object>}
 */
export async function updateTask(id, payload) {
  const res = await api.put(`/tasks/${id}`, payload);
  return res.data;
}

/**
 * Delete a task
 * @param {string} id
 * @returns {Promise<Object>}
 */
export async function deleteTask(id) {
  const res = await api.delete(`/tasks/${id}`);
  return res.data;
}
