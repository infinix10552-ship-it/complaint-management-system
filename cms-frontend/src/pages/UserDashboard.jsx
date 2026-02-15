import React, { useEffect, useState } from 'react';
import { LogOut, Plus, FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { complaintService } from '../services/complaint.service.js';
import { useAuth } from '../context/AuthContext.jsx';

const UserDashboard = () => {
  const { user, logoutUser } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', category: 'Electrical' });
  const [status, setStatus] = useState({ type: '', msg: '' });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user?.id) {
      fetchMyComplaints();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const fetchMyComplaints = async () => {
    try {
      const res = await complaintService.getMyComplaints(user.id);
      setComplaints(Array.isArray(res) ? res : []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', msg: '' });
    setIsLoading(true);
    try {
      await complaintService.createComplaint(form.title, form.description, form.category, user.id);
      setStatus({ type: 'success', msg: '✓ Complaint filed successfully!' });
      setForm({ title: '', description: '', category: 'Electrical' });
      fetchMyComplaints();
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', msg: '✗ Failed to file complaint. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logoutUser();
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'RESOLVED':
      case 'CLOSED':
        return <span className="badge-success">✓ {status}</span>;
      case 'IN_PROGRESS':
        return <span className="badge-info">⟳ {status}</span>;
      case 'OPEN':
        return <span className="badge-pending">○ {status}</span>;
      case 'REJECTED':
        return <span className="badge-error">✕ {status}</span>;
      default:
        return <span className="badge-pending">{status}</span>;
    }
  };

  const stats = [
    { label: 'Total Complaints', value: complaints.length, icon: FileText, color: 'from-blue-500 to-indigo-600' },
    { label: 'Resolved', value: complaints.filter(c => c.status === 'RESOLVED').length, icon: CheckCircle, color: 'from-emerald-500 to-green-600' },
    { label: 'In Progress', value: complaints.filter(c => c.status === 'IN_PROGRESS').length, icon: Clock, color: 'from-amber-500 to-orange-600' },
    { label: 'Pending', value: complaints.filter(c => c.status === 'OPEN').length, icon: AlertCircle, color: 'from-purple-500 to-pink-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 w-64 h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white p-6 shadow-2xl z-50">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 flex items-center justify-center font-bold text-lg">
            CS
          </div>
          <div>
            <h1 className="text-lg font-bold">Complaint Sys</h1>
            <p className="text-xs text-gray-400">Management</p>
          </div>
        </div>

        <nav className="space-y-2 mb-12">
          <a href="#" className="block px-4 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 font-semibold">
            Dashboard
          </a>
          <a href="#complaints" className="block px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors">
            My Complaints
          </a>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="mb-4 p-4 bg-gray-700 rounded-lg">
            <p className="text-xs text-gray-400">Logged in as</p>
            <p className="text-sm font-semibold truncate">{user?.sub || 'User'}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 font-semibold transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Top Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome to your complaint management center</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="stat-card">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color} text-white`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* New Complaint Form */}
        <div className="card mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-indigo-100">
              <Plus className="w-5 h-5 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">File a New Complaint</h2>
          </div>

          {status.msg && (
            <div className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
              status.type === 'success' 
                ? 'bg-emerald-50 border border-emerald-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              {status.type === 'success' ? (
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              )}
              <p className={status.type === 'success' ? 'text-emerald-700' : 'text-red-700'}>
                {status.msg}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Title</label>
                <input
                  type="text"
                  placeholder="Brief title of your complaint"
                  value={form.title}
                  onChange={e => setForm({...form, title: e.target.value})}
                  required
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Category</label>
                <select
                  value={form.category}
                  onChange={e => setForm({...form, category: e.target.value})}
                  className="input-field"
                >
                  <option>Electrical</option>
                  <option>Plumbing</option>
                  <option>Internet</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Description</label>
              <textarea
                rows="4"
                placeholder="Provide details about your complaint..."
                value={form.description}
                onChange={e => setForm({...form, description: e.target.value})}
                required
                className="input-field resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              {isLoading ? 'Filing Complaint...' : 'File Complaint'}
            </button>
          </form>
        </div>

        {/* Complaints Table */}
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">My Complaints</h2>

          {complaints.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="table-header">
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Title</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Category</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Status</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {complaints.map(complaint => (
                    <tr key={complaint.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-gray-900">{complaint.title}</p>
                          <p className="text-sm text-gray-600 mt-1">{complaint.description.substring(0, 60)}...</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                          {complaint.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(complaint.status)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {complaint.createdAt ? new Date(complaint.createdAt).toLocaleDateString() : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">No complaints filed yet</p>
              <p className="text-gray-400 text-sm">Start by filing your first complaint above</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;


