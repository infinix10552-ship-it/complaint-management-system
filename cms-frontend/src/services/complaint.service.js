import api from './api';

export const complaintService = {
  // Create a new complaint
  createComplaint: async (title, description, category, userId) => {
    // We map the userId to user_id to match the Java ComplaintRequest class
    const payload = {
      title,
      description,
      category,
      user_id: userId 
    };
    const response = await api.post('/api/complaints', payload);
    return response.data;
  },

  // Get complaints for a specific user
  getMyComplaints: async (userId) => {
    const response = await api.get(`/api/complaints/my/${userId}`);
    return response.data;
  },

  // Get all complaints (Admin)
  getAllComplaintsAdmin: async () => {
    const response = await api.get('/api/admin/complaints/all');
    return response.data;
  },

  // Update complaint status (Admin)
  updateStatus: async (id, status) => {
    const response = await api.put(`/api/admin/complaints/${id}/status`, { status });
    return response.data;
  },
  
  // Get single complaint details
  getComplaintById: async (id) => {
      const response = await api.get(`/api/complaints/${id}`);
      return response.data;
  }
};