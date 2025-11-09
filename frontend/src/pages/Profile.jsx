import React, { useEffect, useState } from 'react';
import api from '../api';
import Navbar from '../components/Navbar';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const fetchProfile = async () => {
    try {
      const res = await api.get('/users/me'); // GET /api/users/me
      setProfile(res.data);
      setName(res.data.name || '');
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const onSave = async (e) => {
    e.preventDefault();
    setMessage('');
    setSaving(true);
    try {
      await api.put('/users/me', { name }); // PUT /api/users/me
      setMessage('Profile updated');
      fetchProfile();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to update');
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto p-4">
        <h2 className="text-xl font-semibold mb-4">Profile</h2>
        {!profile ? (
          <div>Loading...</div>
        ) : (
          <form onSubmit={onSave} className="bg-white p-4 rounded shadow space-y-3">
            <div>
              <label className="text-sm block mb-1">Email</label>
              <input value={profile.email} readOnly className="w-full p-2 border rounded bg-slate-100" />
            </div>

            <div>
              <label className="text-sm block mb-1">Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded" />
            </div>

            <div>
              <button disabled={saving} className="px-3 py-2 bg-green-600 text-white rounded">
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>

            {message && <div className="text-sm text-slate-600">{message}</div>}
            <div className="text-xs text-slate-500">You can only update name in this demo.</div>
          </form>
        )}
      </div>
    </div>
  );
}
