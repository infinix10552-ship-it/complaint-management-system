import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import complaintService from "../services/complaint.service";

const UserDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [complaints, setComplaints] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.id) {
      loadComplaints();
    }
  }, [user]);

  const loadComplaints = async () => {
    try {
      const data = await complaintService.getUserComplaints(user.id);
      setComplaints(data);
    } catch (error) {
      console.error("Failed to load complaints", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await complaintService.createComplaint({ title, description, userId: user.id });
      setTitle("");
      setDescription("");
      loadComplaints();
      alert("Complaint submitted successfully!");
    } catch (error) {
      alert("Failed to submit complaint");
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

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-white flex-shrink-0">
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-2xl font-bold tracking-wider">CMS Portal</h1>
          <p className="text-slate-400 text-sm mt-1">User Dashboard</p>
        </div>
        <nav className="p-4 space-y-2">
          <a href="#" className="block px-4 py-3 bg-indigo-600 rounded-lg text-white font-medium shadow-md">My Complaints</a>
          {/* Add more nav items here if needed */}
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
        
        {/* Header Section */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">Hello, {user?.name}</h2>
            <p className="text-slate-500 mt-1">Here is what's happening with your requests.</p>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <div className="text-slate-500 text-sm font-medium uppercase tracking-wide">Total Complaints</div>
                <div className="text-3xl font-bold text-slate-800 mt-2">{complaints.length}</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <div className="text-slate-500 text-sm font-medium uppercase tracking-wide">Pending</div>
                <div className="text-3xl font-bold text-yellow-600 mt-2">
                    {complaints.filter(c => c.status === 'PENDING').length}
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <div className="text-slate-500 text-sm font-medium uppercase tracking-wide">Resolved</div>
                <div className="text-3xl font-bold text-green-600 mt-2">
                    {complaints.filter(c => c.status === 'RESOLVED').length}
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* New Complaint Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
                <div className="bg-indigo-600 px-6 py-4">
                    <h3 className="text-white font-semibold text-lg">New Complaint</h3>
                </div>
                <div className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none"
                                placeholder="Brief summary of issue"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                            <textarea
                                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none h-32 resize-none"
                                placeholder="Detailed explanation..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            ></textarea>
                        </div>
                        <button 
                            type="submit" 
                            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow-md transition transform hover:scale-[1.02]"
                        >
                            Submit Complaint
                        </button>
                    </form>
                </div>
            </div>
          </div>

          {/* Complaints List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <h3 className="font-bold text-slate-700">Recent History</h3>
                </div>
                
                {loading ? (
                    <div className="p-8 text-center text-slate-500">Loading your data...</div>
                ) : complaints.length === 0 ? (
                    <div className="p-8 text-center text-slate-500">No complaints found. Good news!</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-semibold">
                                <tr>
                                    <th className="px-6 py-3">ID</th>
                                    <th className="px-6 py-3">Subject</th>
                                    <th className="px-6 py-3">Date</th>
                                    <th className="px-6 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {complaints.map((complaint) => (
                                    <tr key={complaint.id} className="hover:bg-slate-50 transition">
                                        <td className="px-6 py-4 text-slate-500 font-mono text-sm">#{complaint.id}</td>
                                        <td className="px-6 py-4 font-medium text-slate-800">{complaint.title}</td>
                                        <td className="px-6 py-4 text-slate-500 text-sm">
                                            {/* Simple date formatting if needed, assuming generic string for now */}
                                            {new Date().toLocaleDateString()} 
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(complaint.status)}`}>
                                                {complaint.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default UserDashboard;