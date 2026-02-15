import React, { useEffect, useState } from 'react';
import { complaintService } from '../services/complaint.service.js';
import { useAuth } from '../context/AuthContext.jsx';

const AdminDashboard = () => {
  const { logoutUser } = useAuth();
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await complaintService.getAllComplaintsAdmin();
      setComplaints(Array.isArray(res) ? res : []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      // Backend expects StatusUpdateRequest { status: "OPEN" }
      await complaintService.updateStatus(id, newStatus);
      loadData(); // Refresh list
    } catch (err) {
      alert('Error updating status');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin Portal</h1>
        <button onClick={logoutUser} className="text-gray-300 hover:text-white">Logout</button>
      </nav>

      <div className="container mx-auto p-8">
        <h2 className="text-2xl font-bold mb-6">All Complaints</h2>
        <div className="bg-white rounded shadow overflow-hidden overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">User</th>
                <th className="p-4 text-left">Title</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {complaints.map(c => (
                <tr key={c.id}>
                  <td className="p-4">{c.id}</td>
                  {/* Accessing user.username via relation in Complaint entity */}
                  <td className="p-4">{c.user?.email || c.user?.username || 'N/A'}</td>
                  <td className="p-4">{c.title}</td>
                  <td className="p-4">{c.category}</td>
                  <td className="p-4">{c.createdAt ? new Date(c.createdAt).toLocaleDateString() : 'N/A'}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      c.status === 'RESOLVED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>{c.status}</span>
                  </td>
                  <td className="p-4">
                    <select 
                      className="border rounded p-1"
                      value={c.status}
                      onChange={(e) => handleStatusChange(c.id, e.target.value)}
                    >
                      <option value="OPEN">OPEN</option>
                      <option value="IN_PROGRESS">IN_PROGRESS</option>
                      <option value="RESOLVED">RESOLVED</option>
                      <option value="CLOSED">CLOSED</option>
                      <option value="REJECTED">REJECTED</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;