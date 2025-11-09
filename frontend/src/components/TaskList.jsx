import React from 'react'

export default function TaskList({ tasks, onEdit, onDelete }){
  return (
    <div className="space-y-3">
      {tasks.length === 0 && <div className="text-sm text-slate-500">No tasks</div>}
      {tasks.map(t => (
        <div key={t._id} className="p-4 bg-white rounded shadow flex justify-between items-start">
          <div>
            <div className="font-semibold">{t.title}</div>
            <div className="text-sm text-slate-600">{t.description}</div>
            <div className="text-xs text-slate-400 mt-2">{(t.tags||[]).join(', ')}</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-sm">{t.status}</div>
            <div className="flex gap-2">
              <button onClick={()=>onEdit(t)} className="px-2 py-1 bg-yellow-400 rounded">Edit</button>
              <button onClick={()=>onDelete(t._id)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}