import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import complaintService from "../services/complaint.service";

const AdminDashboard = () => {
  const { logout } = useContext(AuthContext);
  const [complaints, setComplaints] = useState([]);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = async () => {
    try {
      const data = await complaintService.getAllComplaints();
      setComplaints(data);
    } catch (error) {
      console.error("Failed to load complaints", error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await complaintService.updateStatus(id, status);
      loadComplaints();
    } catch (error) {
      alert("Failed to update status");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "IN_PROGRESS": return "bg-blue-100 text-blue-800 border-blue-200";
      case "RESOLVED": return "bg-green-100 text-green-800 border-green-200";
      case "REJECTED": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredComplaints = filter === "ALL" 
    ? complaints 
    : complaints.filter(c => c.status === filter);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
       {/* Sidebar */}
       <aside className="w-full md:w-64 bg-slate-900 text-white flex-shrink-0">
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-2xl font-bold tracking-wider">CMS Admin</h1>
          <p className="text-slate-400 text-sm mt-1">Management Portal</p>
        </div>
        <nav className="p-4 space-y-2">
          <button 
            onClick={() => setFilter("ALL")}
            className={`w-full text-left px-4 py-3 rounded-lg font-medium transition ${filter === 'ALL' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800'}`}
          >
            All Tickets
          </button>
          <button 
             onClick={() => setFilter("PENDING")}
             className={`w-full text-left px-4 py-3 rounded-lg font-medium transition ${filter === 'PENDING' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800'}`}
          >
            Pending
          </button>
          <button 
             onClick={() => setFilter("RESOLVED")}
             className={`w-full text-left px-4 py-3 rounded-lg font-medium transition ${filter === 'RESOLVED' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800'}`}
          >
            Resolved
          </button>
        </nav>
        <div className="p-4 mt-auto">
          <button 
            onClick={logout} 
            className="w-full flex items-center justify-center px-4 py-2 border border-slate-600 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">Dashboard Overview</h2>
            <p className="text-slate-500 mt-1">Manage and resolve user complaints.</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200">
             <span className="text-slate-500 text-sm font-medium mr-2">Total Tickets:</span>
             <span className="text-indigo-600 font-bold text-lg">{complaints.length}</span>
          </div>
        </header>

        <div className="bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-semibold border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4">ID</th>
                            <th className="px-6 py-4">User</th>
                            <th className="px-6 py-4">Subject & Description</th>
                            <th className="px-6 py-4">Current Status</th>
                            <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredComplaints.map((complaint) => (
                            <tr key={complaint.id} className="hover:bg-slate-50 transition">
                                <td className="px-6 py-4 text-slate-500 font-mono text-sm align-top">#{complaint.id}</td>
                                <td className="px-6 py-4 align-top">
                                    <div className="font-medium text-slate-800">User ID: {complaint.user?.id || 'N/A'}</div>
                                    <div className="text-xs text-slate-500">{complaint.user?.email || 'No Email'}</div>
                                </td>
                                <td className="px-6 py-4 align-top max-w-xs">
                                    <div className="font-semibold text-slate-800 mb-1">{complaint.title}</div>
                                    <p className="text-sm text-slate-600 line-clamp-2">{complaint.description}</p>
                                </td>
                                <td className="px-6 py-4 align-top">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(complaint.status)}`}>
                                        {complaint.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 align-top">
                                    <div className="flex justify-center gap-2">
                                        {complaint.status !== 'RESOLVED' && (
                                            <button 
                                                onClick={() => updateStatus(complaint.id, "RESOLVED")}
                                                className="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1 rounded text-xs font-medium transition"
                                            >
                                                Resolve
                                            </button>
                                        )}
                                        {complaint.status !== 'IN_PROGRESS' && complaint.status !== 'RESOLVED' && (
                                            <button 
                                                onClick={() => updateStatus(complaint.id, "IN_PROGRESS")}
                                                className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded text-xs font-medium transition"
                                            >
                                                Process
                                            </button>
                                        )}
                                        {complaint.status !== 'REJECTED' && (
                                            <button 
                                                onClick={() => updateStatus(complaint.id, "REJECTED")}
                                                className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded text-xs font-medium transition"
                                            >
                                                Reject
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredComplaints.length === 0 && (
                    <div className="p-10 text-center text-slate-500">
                        No complaints found in this category.
                    </div>
                )}
            </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;