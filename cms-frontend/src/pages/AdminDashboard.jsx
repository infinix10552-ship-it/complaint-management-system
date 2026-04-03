import React, { useEffect, useState } from 'react';
import { LogOut, Settings, BarChart3, Inbox, CheckCircle, AlertCircle, TrendingUp, LayoutDashboard } from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import { complaintService } from '../services/complaint.service.js';
import { useAuth } from '../context/AuthContext.jsx';

const AdminDashboard = () => {
  const { logoutUser } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [updateStatus, setUpdateStatus] = useState({ type: '', msg: '' });
  const [activeTab, setActiveTab] = useState('board');

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
      setUpdateStatus({ type: 'success', msg: 'Status updated' });
      setTimeout(() => setUpdateStatus({ type: '', msg: '' }), 3000);
      loadData();
    } catch {
      setUpdateStatus({ type: 'error', msg: 'Error updating status' });
    }
  };

  const getStatusBadge = (statusStr) => {
    switch (statusStr) {
      case 'RESOLVED':
      case 'CLOSED':
        return <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-bold uppercase bg-[#E3FCEF] text-[#006644]">{statusStr}</span>;
      case 'IN_PROGRESS':
        return <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-bold uppercase bg-[#DEEBFF] text-[#0747A6]">{statusStr.replace('_', ' ')}</span>;
      case 'OPEN':
        return <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-bold uppercase bg-[#DFE1E6] text-[#42526E]">TO DO</span>;
      case 'REJECTED':
        return <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-bold uppercase bg-[#FFEBE6] text-[#BF2600]">{statusStr}</span>;
      default:
        return <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-bold uppercase bg-[#DFE1E6] text-[#42526E]">{statusStr}</span>;
    }
  };

  const stats = [
    { label: 'Total', value: complaints.length, icon: Inbox, color: 'text-[#0052CC]' },
    { label: 'Open', value: complaints.filter(c => c.status === 'OPEN').length, icon: AlertCircle, color: 'text-[#FF8B00]' },
    { label: 'In Progress', value: complaints.filter(c => c.status === 'IN_PROGRESS').length, icon: TrendingUp, color: 'text-[#0052CC]' },
    { label: 'Resolved', value: complaints.filter(c => c.status === 'RESOLVED' || c.status === 'CLOSED').length, icon: CheckCircle, color: 'text-[#006644]' },
  ];

  return (
    <div className="flex h-screen bg-white font-sans text-[#172B4D]">
      {/* Sidebar */}
      <div className="w-64 border-r border-[#DFE1E6] bg-[#FAFBFC] flex flex-col flex-shrink-0">
        <div className="flex items-center gap-3 p-5 pl-6 mb-2">
          <div className="w-8 h-8 rounded bg-[#FF5630] flex items-center justify-center text-white font-bold text-lg cursor-pointer flex-shrink-0">
            AD
          </div>
          <span className="font-bold text-[#172B4D] tracking-tight cursor-pointer">Admin Panel</span>
        </div>

        <div className="flex-1 px-4 space-y-1">
          <button 
            onClick={() => setActiveTab('board')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded text-sm font-medium transition-colors ${activeTab === 'board' ? 'bg-[#DEEBFF] text-[#0052CC]' : 'text-[#42526E] hover:bg-[#EBECF0]'}`}
          >
            <LayoutDashboard className="w-4 h-4 ml-1 flex-shrink-0" />
            Board
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded text-sm font-medium transition-colors ${activeTab === 'settings' ? 'bg-[#DEEBFF] text-[#0052CC]' : 'text-[#42526E] hover:bg-[#EBECF0]'}`}
          >
            <Settings className="w-4 h-4 ml-1 flex-shrink-0" />
            Project settings
          </button>
        </div>

        <div className="p-4 border-t border-[#DFE1E6]">
          <button
            onClick={() => logoutUser()}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded text-[#42526E] text-sm font-medium hover:bg-[#EBECF0] transition-colors"
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            Log out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-white">
        <div className="border-b border-[#DFE1E6] px-8 py-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#172B4D]">Complaint Resolution Board</h1>
        </div>

        <div className="flex-1 overflow-auto p-8 bg-white">
          <Motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-[1200px]"
          >
            {activeTab === 'board' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                  {stats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                      <div key={idx} className="bg-white border border-[#DFE1E6] rounded p-4 shadow-sm hover:shadow-[0_4px_8px_rgba(9,30,66,0.05)] transition-shadow">
                        <div className="flex items-center gap-3">
                          <Icon className={`w-8 h-8 ${stat.color} flex-shrink-0`} />
                          <div>
                            <div className="text-2xl font-semibold text-[#172B4D]">{stat.value}</div>
                            <div className="text-xs font-semibold text-[#5E6C84] uppercase tracking-wider">{stat.label}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {updateStatus.msg && (
                  <Motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className={`mb-6 p-4 rounded flex items-start gap-3 ${
                      updateStatus.type === 'success' 
                        ? 'bg-[#E3FCEF] border border-[#79F2C0] text-[#006644]' 
                        : 'bg-[#FFEBE6] border border-[#FF8F73] text-[#DE350B]'
                    }`}
                  >
                    {updateStatus.type === 'success' ? (
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    )}
                    <p className="text-sm font-medium mt-0.5">{updateStatus.msg}</p>
                  </Motion.div>
                )}

                <div className="border border-[#DFE1E6] rounded bg-white overflow-hidden shadow-sm">
                  {isLoading ? (
                     <div className="text-center py-12">
                       <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#0052CC]"></div>
                       <p className="text-[#5E6C84] mt-4 text-sm font-medium">Loading board data...</p>
                     </div>
                  ) : complaints.length > 0 ? (
                    <table className="w-full text-left text-sm text-[#172B4D]">
                      <thead>
                        <tr className="bg-[#FAFBFC] border-b border-[#DFE1E6]">
                          <th className="px-4 py-3 font-semibold text-[#5E6C84] uppercase tracking-wider text-xs w-20">Key</th>
                          <th className="px-4 py-3 font-semibold text-[#5E6C84] uppercase tracking-wider text-xs">Reporter</th>
                          <th className="px-4 py-3 font-semibold text-[#5E6C84] uppercase tracking-wider text-xs w-1/3">Summary</th>
                          <th className="px-4 py-3 font-semibold text-[#5E6C84] uppercase tracking-wider text-xs">Categories</th>
                          <th className="px-4 py-3 font-semibold text-[#5E6C84] uppercase tracking-wider text-xs">Created</th>
                          <th className="px-4 py-3 font-semibold text-[#5E6C84] uppercase tracking-wider text-xs">Status</th>
                          <th className="px-4 py-3 font-semibold text-[#5E6C84] uppercase tracking-wider text-xs">Update</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#DFE1E6]">
                        {complaints.map(complaint => (
                          <tr key={complaint.id} className="hover:bg-[#FAFBFC] transition-colors group">
                            <td className="px-4 py-3 font-medium text-[#5E6C84]">CS-{complaint.id}</td>
                            <td className="px-4 py-3">
                              <span className="text-sm text-[#172B4D]">
                                {complaint.user?.email || complaint.user?.username || 'System User'}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="font-medium text-[#0052CC] cursor-pointer group-hover:underline">{complaint.title}</div>
                            </td>
                            <td className="px-4 py-3">
                              <span className="inline-flex items-center bg-[#EBECF0] text-[#42526E] text-[11px] font-bold uppercase tracking-wide px-2 py-0.5 rounded">
                                {complaint.category}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-[#5E6C84]">
                              {complaint.createdAt ? new Date(complaint.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              {getStatusBadge(complaint.status)}
                            </td>
                            <td className="px-4 py-3">
                              <select
                                value={complaint.status}
                                onChange={(e) => handleStatusChange(complaint.id, e.target.value)}
                                className="w-[140px] text-xs px-2 py-1.5 bg-[#FAFBFC] border border-[#DFE1E6] rounded font-semibold text-[#172B4D] focus:bg-white focus:border-[#4C9AFF] focus:outline-none transition-colors hover:bg-[#EBECF0] appearance-none cursor-pointer"
                              >
                                <option value="OPEN">TO DO</option>
                                <option value="IN_PROGRESS">IN PROGRESS</option>
                                <option value="RESOLVED">RESOLVED</option>
                                <option value="CLOSED">CLOSED</option>
                                <option value="REJECTED">REJECTED</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="p-12 text-center flex flex-col items-center">
                      <Inbox className="w-16 h-16 text-[#DFE1E6] mb-4" />
                      <p className="text-[#172B4D] font-medium text-lg">Queue is empty</p>
                      <p className="text-[#5E6C84] text-sm mt-1">There are no active complaints in the system.</p>
                    </div>
                  )}
                </div>
              </>
            )}

            {activeTab === 'settings' && (
              <div className="text-center p-12 border border-[#DFE1E6] rounded bg-[#FAFBFC]">
                <Settings className="w-16 h-16 text-[#DFE1E6] mx-auto mb-4" />
                <h2 className="text-[#172B4D] text-lg font-medium">Project Settings</h2>
                <p className="text-[#5E6C84] mt-2">Configuration settings will appear here.</p>
              </div>
            )}
          </Motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
