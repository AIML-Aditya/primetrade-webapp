import React from 'react'
import { clearToken, getUserId } from '../utils/auth'
import { useNavigate } from 'react-router-dom'

export default function Navbar(){
  const nav = useNavigate();
  const uid = getUserId();

  const logout = () => { clearToken(); nav('/login'); };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="font-semibold text-lg">Scalable App</div>
        <div className="flex items-center gap-3">
          {uid && <div className="text-sm text-slate-600">ID: {uid.slice(-6)}</div>}
          <button onClick={logout} className="px-3 py-1 bg-red-500 text-white rounded">Logout</button>
        </div>
      </div>
    </nav>
  )
}