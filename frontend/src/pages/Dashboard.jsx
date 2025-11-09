import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import api from '../api'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'

export default function Dashboard(){
  const [profile, setProfile] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [editing, setEditing] = useState(null);

  const fetchProfile = async () => { try { const res = await api.get('/users/me'); setProfile(res.data); } catch (e) { console.error(e); } }
  const fetchTasks = async () => {
    try{ const res = await api.get('/tasks', { params: { q: query || undefined, status: statusFilter || undefined } }); setTasks(res.data); } catch(e){ console.error(e); }
  }

  useEffect(()=>{ fetchProfile(); fetchTasks(); }, []);
  useEffect(()=>{ const t = setTimeout(fetchTasks, 300); return ()=>clearTimeout(t); }, [query, statusFilter]);

  const createTask = async (data) => { try{ await api.post('/tasks', data); fetchTasks(); }catch(e){ console.error(e); } }
  const updateTask = async (id, data) => { try{ await api.put(`/tasks/${id}`, data); setEditing(null); fetchTasks(); }catch(e){ console.error(e); } }
  const deleteTask = async (id) => { if(!confirm('Delete task?')) return; try { await api.delete(`/tasks/${id}`); fetchTasks(); } catch(e){ console.error(e); } }

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 bg-white p-4 rounded shadow">
            <h3 className="font-semibold">Profile</h3>
            {profile ? (
              <div className="mt-2 text-sm">
                <div><strong>Name:</strong> {profile.name}</div>
                <div><strong>Email:</strong> {profile.email}</div>
              </div>
            ) : <div>Loading...</div>}

            <hr className="my-3" />

            <h3 className="font-semibold">Create Task</h3>
            <TaskForm onSubmit={createTask} />
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white p-4 rounded shadow">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Tasks</h3>
                <div className="flex gap-2">
                  <input placeholder="Search..." value={query} onChange={e=>setQuery(e.target.value)} className="p-2 border rounded" />
                  <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)} className="p-2 border rounded">
                    <option value="">All</option>
                    <option value="todo">Todo</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <TaskList tasks={tasks} onEdit={(t)=>setEditing(t)} onDelete={deleteTask} />
              </div>

              {editing && (
                <div className="mt-4">
                  <h4 className="font-semibold">Edit Task</h4>
                  <TaskForm initial={editing} onSubmit={(data)=>updateTask(editing._id, data)} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}