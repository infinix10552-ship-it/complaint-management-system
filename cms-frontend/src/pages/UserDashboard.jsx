import React, { useEffect, useState } from 'react';
import { LogOut, Plus, FileText, CheckCircle, Clock, AlertCircle, LayoutDashboard } from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import { complaintService } from '../services/complaint.service.js';
import { useAuth } from '../context/AuthContext.jsx';

const UserDashboard = () => {
  const { user, logoutUser } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', category: 'Electrical' });
  const [status, setStatus] = useState({ type: '', msg: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

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
      setStatus({ type: 'success', msg: 'Complaint filed successfully.' });
      setForm({ title: '', description: '', category: 'Electrical' });
      fetchMyComplaints();
      setTimeout(() => setStatus({ type: '', msg: '' }), 5000);
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', msg: 'Failed to file complaint. Please try again.' });
    } finally {
      setIsLoading(false);
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
        return <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-bold uppercase bg-[#DFE1E6] text-[#42526E]">{statusStr}</span>;
      case 'REJECTED':
        return <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-bold uppercase bg-[#FFEBE6] text-[#BF2600]">{statusStr}</span>;
      default:
        return <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-bold uppercase bg-[#DFE1E6] text-[#42526E]">{statusStr}</span>;
    }
  };

  const stats = [
    { label: 'Total', value: complaints.length, icon: FileText, color: 'text-[#0052CC]' },
    { label: 'Resolved', value: complaints.filter(c => c.status === 'RESOLVED').length, icon: CheckCircle, color: 'text-[#006644]' },
    { label: 'In Progress', value: complaints.filter(c => c.status === 'IN_PROGRESS').length, icon: Clock, color: 'text-[#FF8B00]' },
    { label: 'Pending', value: complaints.filter(c => c.status === 'OPEN').length, icon: AlertCircle, color: 'text-[#42526E]' },
  ];

  return (
    <div className="flex h-screen bg-white font-sans text-[#172B4D]">
      {/* Sidebar */}
      <div className="w-64 border-r border-[#DFE1E6] bg-[#FAFBFC] flex flex-col flex-shrink-0">
        <div className="flex items-center gap-3 p-5 pl-6 mb-2">
          <div className="w-8 h-8 rounded bg-[#0052CC] flex items-center justify-center text-white font-bold text-lg cursor-pointer flex-shrink-0">
            C
          </div>
          <span className="font-bold text-[#172B4D] tracking-tight cursor-pointer">CivicResolve</span>
        </div>

        <div className="px-4 pb-4">
          <div className="flex items-center gap-3 px-3 py-2">
             <div className="w-8 h-8 rounded-full bg-[#0052CC] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
               {user?.sub?.[0]?.toUpperCase() || 'U'}
             </div>
             <div className="overflow-hidden">
               <div className="text-sm font-semibold text-[#172B4D] truncate w-full">{user?.sub || 'User'}</div>
               <div className="text-xs text-[#5E6C84]">Customer Portal</div>
             </div>
          </div>
        </div>

        <div className="flex-1 px-4 space-y-1">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded text-sm font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-[#DEEBFF] text-[#0052CC]' : 'text-[#42526E] hover:bg-[#EBECF0]'}`}
          >
            <LayoutDashboard className="w-4 h-4 ml-1 flex-shrink-0" />
            Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('new')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded text-sm font-medium transition-colors ${activeTab === 'new' ? 'bg-[#DEEBFF] text-[#0052CC]' : 'text-[#42526E] hover:bg-[#EBECF0]'}`}
          >
            <Plus className="w-4 h-4 ml-1 flex-shrink-0" />
            File Complaint
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
          <h1 className="text-2xl font-bold text-[#172B4D]">Customer Dashboard</h1>
        </div>

        <div className="flex-1 overflow-auto p-8 bg-white">
          <Motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-[1000px]"
          >
            
            {activeTab === 'dashboard' && (
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

                <div className="mb-6 flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-[#172B4D]">My Complaints</h2>
                  <button 
                    onClick={() => setActiveTab('new')}
                    className="bg-[#0052CC] hover:bg-[#0047B3] text-white text-sm font-bold py-1.5 px-3 rounded transition-colors"
                  >
                    Create Issue
                  </button>
                </div>

                <div className="border border-[#DFE1E6] rounded bg-white overflow-hidden shadow-sm">
                  {complaints.length > 0 ? (
                    <table className="w-full text-left text-sm text-[#172B4D]">
                      <thead>
                        <tr className="bg-[#FAFBFC] border-b border-[#DFE1E6]">
                          <th className="px-4 py-3 font-semibold text-[#5E6C84] uppercase tracking-wider text-xs">Title</th>
                          <th className="px-4 py-3 font-semibold text-[#5E6C84] uppercase tracking-wider text-xs">Category</th>
                          <th className="px-4 py-3 font-semibold text-[#5E6C84] uppercase tracking-wider text-xs">Status</th>
                          <th className="px-4 py-3 font-semibold text-[#5E6C84] uppercase tracking-wider text-xs">Created</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#DFE1E6]">
                        {complaints.map(complaint => (
                          <tr key={complaint.id} className="hover:bg-[#FAFBFC] transition-colors group cursor-pointer">
                            <td className="px-4 py-3">
                              <div className="font-medium text-[#0052CC] group-hover:underline">{complaint.title}</div>
                            </td>
                            <td className="px-4 py-3">
                              <span className="inline-flex items-center bg-[#EBECF0] text-[#42526E] text-xs font-semibold px-2 py-0.5 rounded">
                                {complaint.category}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              {getStatusBadge(complaint.status)}
                            </td>
                            <td className="px-4 py-3 text-[#5E6C84]">
                              {complaint.createdAt ? new Date(complaint.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="p-12 text-center flex flex-col items-center">
                      <FileText className="w-16 h-16 text-[#DFE1E6] mb-4" />
                      <p className="text-[#172B4D] font-medium text-lg">No issues found</p>
                      <p className="text-[#5E6C84] text-sm mt-1 mb-4">You haven't filed any complaints yet.</p>
                      <button 
                        onClick={() => setActiveTab('new')}
                        className="bg-[#FAFBFC] hover:bg-[#EBECF0] text-[#172B4D] border border-[#DFE1E6] font-semibold py-2 px-4 rounded transition-colors"
                      >
                        Create your first issue
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}

            {activeTab === 'new' && (
              <div className="max-w-2xl">
                <h2 className="text-xl font-bold text-[#172B4D] mb-6">Create Issue</h2>

                {status.msg && (
                  <Motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className={`mb-6 p-4 rounded flex items-start gap-3 ${
                      status.type === 'success' 
                        ? 'bg-[#E3FCEF] border border-[#79F2C0] text-[#006644]' 
                        : 'bg-[#FFEBE6] border border-[#FF8F73] text-[#DE350B]'
                    }`}
                  >
                    {status.type === 'success' ? (
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    )}
                    <p className="text-sm font-medium mt-0.5">{status.msg}</p>
                  </Motion.div>
                )}

                <div className="bg-white rounded border border-[#DFE1E6] p-6 shadow-sm">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-[#42526E] font-semibold text-sm mb-1.5">Summary <span className="text-[#DE350B]">*</span></label>
                      <input
                        type="text"
                        value={form.title}
                        onChange={e => setForm({...form, title: e.target.value})}
                        required
                        placeholder="Brief summary of the issue"
                        className="w-full px-3 py-2 bg-[#FAFBFC] border-2 border-[#DFE1E6] rounded text-[#172B4D] text-sm focus:bg-white focus:border-[#4C9AFF] focus:outline-none transition-colors hover:bg-[#EBECF0]"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-[#42526E] font-semibold text-sm mb-1.5">Issue Type <span className="text-[#DE350B]">*</span></label>
                      <select
                        value={form.category}
                        onChange={e => setForm({...form, category: e.target.value})}
                        className="w-[250px] px-3 py-2 bg-[#FAFBFC] border-2 border-[#DFE1E6] rounded text-[#172B4D] text-sm focus:bg-white focus:border-[#4C9AFF] focus:outline-none transition-colors hover:bg-[#EBECF0]"
                      >
                        <option>Electrical</option>
                        <option>Plumbing</option>
                        <option>Internet</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[#42526E] font-semibold text-sm mb-1.5">Description</label>
                      <textarea
                        rows="5"
                        value={form.description}
                        onChange={e => setForm({...form, description: e.target.value})}
                        required
                        placeholder="Provide the details..."
                        className="w-full px-3 py-2 bg-[#FAFBFC] border-2 border-[#DFE1E6] rounded text-[#172B4D] text-sm focus:bg-white focus:border-[#4C9AFF] focus:outline-none transition-colors hover:bg-[#EBECF0] resize-y min-h-[100px]"
                      />
                    </div>
                    
                    <div className="pt-4 border-t border-[#DFE1E6] flex gap-3">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-[#0052CC] hover:bg-[#0047B3] text-white font-bold py-2 px-4 rounded transition-colors disabled:opacity-50 text-sm"
                      >
                        {isLoading ? 'Creating...' : 'Create'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab('dashboard')}
                        className="bg-transparent hover:bg-[#EBECF0] text-[#42526E] font-bold py-2 px-4 rounded transition-colors text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

          </Motion.div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
