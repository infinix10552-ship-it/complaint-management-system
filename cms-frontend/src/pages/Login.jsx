import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import { authService } from '../services/auth.service';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const data = await authService.login(formData.email, formData.password);
      loginUser(data.token);
      navigate('/dashboard');
    } catch {
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-[#F4F5F7] flex flex-col items-center justify-center p-4 font-sans selection:bg-[#0052CC] selection:text-white relative">
      {/* Subtle background element */}
      <div className="absolute inset-0 bg-[url('https://www.toptal.com/designers/subtlepatterns/uploads/dot-grid.png')] opacity-20 z-0"></div>
      
      <Motion.div 
        className="w-full max-w-[400px] z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="text-center mb-8 flex flex-col items-center">
          <Link to="/" className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded bg-[#0052CC] flex items-center justify-center text-white font-bold text-2xl">
              C
            </div>
            <span className="text-3xl font-bold tracking-tight text-[#172B4D]">CivicResolve</span>
          </Link>
          <h1 className="text-2xl font-bold text-[#172B4D] mb-1">Log in to your account</h1>
        </div>

        <div className="bg-white rounded shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#DFE1E6] p-8 mb-6">
          {error && (
            <Motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-6 p-4 bg-[#FFEBE6] border border-[#FF8F73] rounded flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-[#DE350B] flex-shrink-0 mt-0.5" />
              <p className="text-[#DE350B] text-sm font-medium">{error}</p>
            </Motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[#42526E] font-bold text-sm mb-1.5">Email address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2.5 bg-[#FAFBFC] border-2 border-[#DFE1E6] rounded text-[#172B4D] focus:bg-white focus:border-[#4C9AFF] focus:outline-none transition-colors hover:bg-[#EBECF0]"
              />
            </div>

            <div>
              <label className="block text-[#42526E] font-bold text-sm mb-1.5">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2.5 bg-[#FAFBFC] border-2 border-[#DFE1E6] rounded text-[#172B4D] focus:bg-white focus:border-[#4C9AFF] focus:outline-none transition-colors hover:bg-[#EBECF0]"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0052CC] hover:bg-[#0047B3] text-white font-bold py-2.5 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 mt-2"
            >
              {isLoading ? 'Logging in...' : 'Log in'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#DFE1E6] text-center">
            <p className="text-[#5E6C84] text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="text-[#0052CC] font-medium hover:underline">
                Sign up for free
              </Link>
            </p>
          </div>
        </div>
        
        <div className="text-center flex justify-center space-x-4 text-xs text-[#5E6C84]">
          <a href="#" className="hover:underline hover:text-[#172B4D]">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:underline hover:text-[#172B4D]">User Notice</a>
        </div>
      </Motion.div>
    </div>
  );
};

export default Login;
