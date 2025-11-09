import React, { useState, useEffect } from 'react'

export default function TaskForm({ onSubmit, initial = {} }){
  const [form, setForm] = useState({ title:'', description:'', status:'todo', tags:'' });

  useEffect(()=>{ if (initial && Object.keys(initial).length) setForm({ ...form, ...initial, tags: (initial.tags||[]).join(',') }); }, []);

  const change = e => setForm({...form, [e.target.name]: e.target.value});
  const submit = (e) => { e.preventDefault(); const payload = { ...form, tags: form.tags.split(',').map(t=>t.trim()).filter(Boolean) }; onSubmit(payload); }

  return (
    <form onSubmit={submit} className="space-y-2">
      <input name="title" value={form.title} onChange={change} placeholder="Title" className="w-full p-2 border rounded" />
      <textarea name="description" value={form.description} onChange={change} placeholder="Description" className="w-full p-2 border rounded" />
      <div className="flex gap-2">
        <select name="status" value={form.status} onChange={change} className="p-2 border rounded">
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
      <input name="tags" value={form.tags} onChange={change} placeholder="tags,comma,separated" className="w-full p-2 border rounded" />
      <div className="flex gap-2">
        <button className="px-3 py-1 bg-green-600 text-white rounded">Save</button>
      </div>
    </form>
  )
}