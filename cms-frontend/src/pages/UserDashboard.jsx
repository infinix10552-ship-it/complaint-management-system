import React, { useEffect, useState } from 'react';
import { complaintService } from '../services/complaint.service.js';
import { useAuth } from '../context/AuthContext.jsx';

const UserDashboard = () => {
  const { user, logoutUser } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', category: 'Electrical' });
  const [status, setStatus] = useState({ type: '', msg: '' });

  useEffect(() => {
    if (user?.id) fetchMyComplaints();
  }, [user]);

  const fetchMyComplaints = async () => {
    try {
      const res = await complaintService.getMyComplaints(user.id);
      // Ensure res is an array, handle cases where data might be nested
      setComplaints(Array.isArray(res) ? res : []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', msg: '' }); // Clear previous status
    try {
      // Backend createComplaint requires user_id
      await complaintService.createComplaint(form.title, form.description, form.category, user.id);
      setStatus({ type: 'success', msg: 'Complaint filed successfully' });
      setForm({ title: '', description: '', category: 'Electrical' });
      fetchMyComplaints();
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', msg: 'Failed to file complaint. Please try again.' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">Complaint System</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">Welcome, {user?.sub}</span>
          <button onClick={logoutUser} className="text-red-500 hover:text-red-700">Logout</button>
        </div>
      </nav>

      <div className="container mx-auto p-8 max-w-4xl">
        <div className="bg-white p-6 rounded shadow mb-8">
          <h2 className="text-lg font-semibold mb-4">File a New Complaint</h2>
          {status.msg && <div className={`p-2 mb-4 rounded ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{status.msg}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input 
                className="border p-2 rounded w-full" 
                placeholder="Title" 
                value={form.title}
                onChange={e => setForm({...form, title: e.target.value})} 
                required 
              />
              <select 
                className="border p-2 rounded w-full"
                value={form.category}
                onChange={e => setForm({...form, category: e.target.value})}
              >
                <option>Electrical</option>
                <option>Plumbing</option>
                <option>Internet</option>
                <option>Other</option>
              </select>
            </div>
            <textarea 
              className="border p-2 rounded w-full" 
              rows="3" 
              placeholder="Description"
              value={form.description}
              onChange={e => setForm({...form, description: e.target.value})}
              required
            />
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Submit</button>
          </form>
        </div>

        <h2 className="text-xl font-bold mb-4">My Complaints</h2>
        <div className="grid gap-4">
          {complaints.length > 0 ? (
            complaints.map(c => (
              <div key={c.id} className="bg-white p-4 rounded shadow border-l-4 border-blue-500">
                <div className="flex justify-between">
                  <h3 className="font-bold">{c.title}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    c.status === 'RESOLVED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>{c.status}</span>
                </div>
                <p className="text-gray-600 mt-1">{c.description}</p>
                <div className="mt-2 text-xs text-gray-400">Category: {c.category} | Date: {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : 'N/A'}</div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No complaints found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;