import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/auth.service';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await authService.login(formData.email, formData.password);
      loginUser(data.token);
      // Redirect based on role logic if needed, or default to generic route
      // We'll let the PrivateRoute logic handle the specific dashboard via the App router
      navigate('/dashboard'); 
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg w-96">
        <h3 className="text-2xl font-bold text-center text-gray-800">Login</h3>
        {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label className="block text-gray-700">Email</label>
            <input type="email" placeholder="Email" required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700">Password</label>
            <input type="password" placeholder="Password" required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <div className="flex items-baseline justify-between">
            <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900 w-full">Login</button>
          </div>
          <div className="mt-4 text-center">
            <Link to="/register" className="text-sm text-blue-600 hover:underline">Create an account</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;