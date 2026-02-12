import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/auth.service';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.register(formData.name, formData.email, formData.password);
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      alert('Registration failed.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg w-96">
        <h3 className="text-2xl font-bold text-center text-gray-800">Register</h3>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label className="block text-gray-700">Full Name</label>
            <input type="text" required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700">Email</label>
            <input type="email" required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700">Password</label>
            <input type="password" required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <button className="px-6 py-2 mt-4 text-white bg-green-600 rounded-lg hover:bg-green-900 w-full">Register</button>
          <div className="mt-4 text-center">
            <Link to="/login" className="text-sm text-blue-600 hover:underline">Back to Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;