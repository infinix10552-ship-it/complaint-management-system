import React, { useEffect, useState } from 'react';
import { LogOut, Settings, BarChart3, Inbox, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';
import { complaintService } from '../services/complaint.service.js';
import { useAuth } from '../context/AuthContext.jsx';

const AdminDashboard = () => {
  const { logoutUser } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [updateStatus, setUpdateStatus] = useState({ type: '', msg: '' });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const res = await complaintService.getAllComplaintsAdmin();
      setComplaints(Array.isArray(res) ? res : []);
    } catch {
      setUpdateStatus({ type: 'error', msg: 'Failed to load complaints' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await complaintService.updateStatus(id, newStatus);
      setUpdateStatus({ type: 'success', msg: '✓ Status updated successfully' });
      setTimeout(() => setUpdateStatus({ type: '', msg: '' }), 3000);
      loadData();
    } catch (err) {
      setUpdateStatus({ type: 'error', msg: '✗ Error updating status' });
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
    {
      label: 'Total Complaints',
      value: complaints.length,
      icon: Inbox,
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Open',
      value: complaints.filter(c => c.status === 'OPEN').length,
      icon: AlertCircle,
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50',
    },
    {
      label: 'In Progress',
      value: complaints.filter(c => c.status === 'IN_PROGRESS').length,
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-50',
    },
    {
      label: 'Resolved',
      value: complaints.filter(c => c.status === 'RESOLVED').length,
      icon: CheckCircle,
      color: 'from-emerald-500 to-green-600',
      bgColor: 'bg-emerald-50',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 w-64 h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white p-6 shadow-2xl z-50">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 flex items-center justify-center font-bold text-lg">
            AD
          </div>
          <div>
            <h1 className="text-lg font-bold">Admin Panel</h1>
            <p className="text-xs text-gray-400">Management</p>
          </div>
        </div>

        <nav className="space-y-2 mb-12">
          <a href="#" className="block px-4 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 font-semibold flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Dashboard
          </a>
          <a href="#complaints" className="block px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2">
            <Inbox className="w-4 h-4" />
            All Complaints
          </a>
          <a href="#settings" className="block px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Settings
          </a>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="mb-4 p-4 bg-gray-700 rounded-lg">
            <p className="text-xs text-gray-400">Role</p>
            <p className="text-sm font-semibold">Administrator</p>
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage and monitor all complaint tickets</p>
        </div>

        {/* Status Alert */}
        {updateStatus.msg && (
          <div className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
            updateStatus.type === 'success' 
              ? 'bg-emerald-50 border border-emerald-200' 
              : 'bg-red-50 border border-red-200'
          }`}>
            {updateStatus.type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            )}
            <p className={updateStatus.type === 'success' ? 'text-emerald-700' : 'text-red-700'}>
              {updateStatus.msg}
            </p>
          </div>
        )}

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

        {/* Complaints Table */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">All Complaints</h2>
            <span className="text-sm text-gray-600">
              {isLoading ? 'Loading...' : `${complaints.length} total`}
            </span>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              </div>
              <p className="text-gray-600 mt-4">Loading complaints...</p>
            </div>
          ) : complaints.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="table-header">
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">ID</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">User Email</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Title</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Category</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Date</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Status</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {complaints.map(complaint => (
                    <tr key={complaint.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-mono text-sm text-gray-600">#{complaint.id}</td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-gray-900">
                          {complaint.user?.email || complaint.user?.username || 'N/A'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-gray-900">{complaint.title}</p>
                          <p className="text-xs text-gray-500 mt-1 max-w-xs truncate">{complaint.description}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800">
                          {complaint.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {complaint.createdAt ? new Date(complaint.createdAt).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(complaint.status)}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={complaint.status}
                          onChange={(e) => handleStatusChange(complaint.id, e.target.value)}
                          className="text-sm px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white cursor-pointer"
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
          ) : (
            <div className="text-center py-12">
              <Inbox className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">No complaints found</p>
              <p className="text-gray-400 text-sm">All complaints will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;


