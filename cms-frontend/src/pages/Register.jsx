import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import { authService } from '../services/auth.service';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      await authService.register(formData.name, formData.email, formData.password);
      setSuccess('Registration successful! Redirecting to login...');
      setFormData({ name: '', email: '', password: '' });
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch {
      setError('Registration failed. Please check your details and try again.');
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
          <h1 className="text-2xl font-bold text-[#172B4D] mb-1">Sign up for your account</h1>
        </div>

        <div className="bg-white rounded shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#DFE1E6] p-8 mb-6">
          {success && (
            <Motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-6 p-4 bg-[#E3FCEF] border border-[#79F2C0] rounded flex items-start gap-3"
            >
              <CheckCircle className="w-5 h-5 text-[#006644] flex-shrink-0 mt-0.5" />
              <p className="text-[#006644] text-sm font-medium">{success}</p>
            </Motion.div>
          )}

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

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[#42526E] font-bold text-sm mb-1.5">Full name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2.5 bg-[#FAFBFC] border-2 border-[#DFE1E6] rounded text-[#172B4D] focus:bg-white focus:border-[#4C9AFF] focus:outline-none transition-colors hover:bg-[#EBECF0]"
              />
            </div>

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
                placeholder="Create a password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2.5 bg-[#FAFBFC] border-2 border-[#DFE1E6] rounded text-[#172B4D] focus:bg-white focus:border-[#4C9AFF] focus:outline-none transition-colors hover:bg-[#EBECF0]"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0052CC] hover:bg-[#0047B3] text-white font-bold py-2.5 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? 'Signing up...' : 'Sign up'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#DFE1E6] text-center">
            <p className="text-[#5E6C84] text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-[#0052CC] font-medium hover:underline">
                Log in
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

export default Register;
