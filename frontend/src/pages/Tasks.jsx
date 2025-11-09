import React, { useEffect, useState } from 'react';
import api from '../api';
import Navbar from '../components/Navbar';

function TaskForm({ initial = null, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    title: initial?.title || '',
    description: initial?.description || '',
    status: initial?.status || 'todo',
    tags: (initial?.tags || []).join(','),
  });

  useEffect(() => {
    if (initial) {
      setForm({
        title: initial.title || '',
        description: initial.description || '',
        status: initial.status || 'todo',
        tags: (initial.tags || []).join(','),
      });
    }
  }, [initial]);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const payload = { 
      title: form.title,
      description: form.description,
      status: form.status,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
    };
    onSubmit(payload);
  };

  return (
    <form onSubmit={submit} className="space-y-2 bg-white p-3 rounded shadow">
      <input name="title" value={form.title} onChange={change} placeholder="Title" className="w-full p-2 border rounded" />
      <textarea name="description" value={form.description} onChange={change} placeholder="Description" className="w-full p-2 border rounded" />
      <div className="flex gap-2 items-center">
        <select name="status" value={form.status} onChange={change} className="p-2 border rounded">
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <input name="tags" value={form.tags} onChange={change} placeholder="tags,comma,separated" className="flex-1 p-2 border rounded" />
      </div>
      <div className="flex gap-2">
        <button className="px-3 py-1 bg-green-600 text-white rounded">Save</button>
        {onCancel && <button type="button" onClick={onCancel} className="px-3 py-1 bg-gray-200 rounded">Cancel</button>}
      </div>
    </form>
  );
}

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await api.get('/tasks', {
        params: { q: query || undefined, status: statusFilter || undefined },
      });
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    const t = setTimeout(fetchTasks, 300);
    return () => clearTimeout(t);
  }, [query, statusFilter]);

  const createTask = async (data) => {
    try {
      await api.post('/tasks', data);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const updateTask = async (id, data) => {
    try {
      await api.put(`/tasks/${id}`, data);
      setEditing(null);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    if (!confirm('Delete task?')) return;
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-3">Create Task</h3>
            <TaskForm onSubmit={createTask} />
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white p-4 rounded shadow">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Tasks</h3>
                <div className="flex gap-2">
                  <input className="p-2 border rounded" placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} />
                  <select className="p-2 border rounded" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="">All</option>
                    <option value="todo">Todo</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {loading && <div className="text-sm text-slate-500">Loading...</div>}
                {!loading && tasks.length === 0 && <div className="text-sm text-slate-500">No tasks yet</div>}

                {tasks.map((t) => (
                  <div key={t._id} className="p-4 bg-slate-50 rounded border flex justify-between">
                    <div>
                      <div className="font-semibold">{t.title}</div>
                      <div className="text-sm text-slate-600">{t.description}</div>
                      <div className="text-xs text-slate-400 mt-2">{(t.tags || []).join(', ')}</div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <div className="text-sm">{t.status}</div>
                      <div className="flex gap-2">
                        <button onClick={() => setEditing(t)} className="px-2 py-1 bg-yellow-400 rounded">Edit</button>
                        <button onClick={() => deleteTask(t._id)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {editing && (
                <div className="mt-4">
                  <h4 className="font-semibold">Edit Task</h4>
                  <TaskForm
                    initial={editing}
                    onSubmit={(data) => updateTask(editing._id, data)}
                    onCancel={() => setEditing(null)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
