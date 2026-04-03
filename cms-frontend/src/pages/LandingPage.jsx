import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion as Motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight, CheckCircle, Zap, Shield, BarChart3, 
  LayoutDashboard, Menu, X, Users, Code, MessageSquare,
  Globe2, ChevronRight, PlayCircle, Github, Twitter, Linkedin
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -50]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#F4F5F7] font-sans selection:bg-[#0052CC] selection:text-white">
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-[#0052CC] flex items-center justify-center text-white font-bold text-xl">
                C
              </div>
              <span className="text-xl font-bold tracking-tight text-[#172B4D]">CivicResolve</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-[15px] font-medium text-[#42526E] hover:text-[#0052CC] transition-colors">Features</a>
              <a href="#solutions" className="text-[15px] font-medium text-[#42526E] hover:text-[#0052CC] transition-colors">Solutions</a>
              <a href="#resources" className="text-[15px] font-medium text-[#42526E] hover:text-[#0052CC] transition-colors">Resources</a>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <Link to={user.role === 'ADMIN' ? "/admin" : "/dashboard"} className="text-[15px] font-semibold text-[#0052CC] hover:text-[#0047b3] transition-colors">
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/login" className="text-[15px] font-semibold text-[#172B4D] hover:text-[#0052CC] transition-colors">
                    Log in
                  </Link>
                  <Link to="/register" className="bg-[#0052CC] text-white px-5 py-2.5 rounded hover:bg-[#0047b3] transition-colors font-medium text-[15px] shadow-sm hover:shadow">
                    Get it free
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-[#172B4D] focus:outline-none">
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <Motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white shadow-lg border-t border-gray-100"
          >
            <div className="px-4 pt-2 pb-6 space-y-1 mt-2">
              <a href="#features" className="block px-3 py-3 text-base font-medium text-[#172B4D] hover:bg-gray-50 rounded-md">Features</a>
              <a href="#solutions" className="block px-3 py-3 text-base font-medium text-[#172B4D] hover:bg-gray-50 rounded-md">Solutions</a>
              {!user && (
                <div className="pt-4 flex flex-col gap-3">
                  <Link to="/login" className="w-full text-center py-3 text-[#172B4D] font-medium border border-gray-200 rounded-md">Log in</Link>
                  <Link to="/register" className="w-full text-center py-3 bg-[#0052CC] text-white font-medium rounded-md">Get it free</Link>
                </div>
              )}
            </div>
          </Motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden overflow-x-hidden">
        {/* Background shapes inspired by enterprise aesthetic */}
        <div className="absolute top-0 right-0 -mr-40 lg:-mr-[10%] w-[800px] h-[800px] bg-[#E9F2FF] rounded-full blur-3xl opacity-60 z-0"></div>
        <div className="absolute bottom-0 left-0 -ml-40 lg:-ml-[10%] w-[600px] h-[600px] bg-[#E6FCFF] rounded-full blur-3xl opacity-60 z-0"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
            <Motion.div 
              className="w-full lg:w-1/2 text-center lg:text-left pt-10"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#172B4D] leading-[1.1] tracking-tight mb-6">
                Move fast, stay aligned, and resolve <span className="text-[#0052CC]">complaints</span>.
              </h1>
              <p className="text-lg sm:text-xl text-[#42526E] mb-8 font-normal max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                The #1 complaint management software used by agile teams. Track issues, manage workflows, and deliver exceptional service from one unified platform.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
                <Link to="/register" className="w-full sm:w-auto bg-[#0052CC] hover:bg-[#0047b3] text-white px-8 py-3.5 rounded font-medium text-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                  Get it free <ArrowRight size={18} />
                </Link>
                <a href="#demo" className="w-full sm:w-auto text-[#172B4D] hover:text-[#0052CC] px-8 py-3.5 rounded font-medium text-lg transition-all flex items-center justify-center gap-2 border border-transparent hover:border-[#DFE1E6] bg-transparent hover:bg-white">
                  <PlayCircle size={20} className="text-[#0052CC]"/> Discover how it works
                </a>
              </div>
              <p className="text-sm text-[#5E6C84]">No credit card required. Setup in minutes.</p>
            </Motion.div>

            <Motion.div 
              className="w-full lg:w-1/2 relative"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              {/* Abstract App UI Graphic */}
              <div className="relative rounded-xl shadow-2xl bg-white border border-[#DFE1E6] overflow-hidden transform lg:rotate-1 hover:rotate-0 transition-transform duration-500">
                <div className="h-10 bg-[#F4F5F7] border-b border-[#DFE1E6] flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5630]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#FFAB00]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#36B37E]"></div>
                </div>
                <div className="p-6 h-[400px] flex flex-col gap-4 bg-white">
                  <div className="flex justify-between items-center mb-2">
                    <div className="w-1/3 h-6 bg-[#DFE1E6] rounded"></div>
                    <div className="w-10 h-10 bg-[#E9F2FF] text-[#0052CC] rounded-full flex items-center justify-center font-bold">JD</div>
                  </div>
                  <div className="flex gap-4 h-full">
                    <div className="w-1/3 bg-[#F4F5F7] rounded-lg p-3 flex flex-col gap-3">
                      <div className="text-xs font-semibold text-[#5E6C84] uppercase tracking-wider">To Do</div>
                      <div className="bg-white p-3 rounded shadow-sm border border-[#DFE1E6] hover:shadow-md cursor-pointer transition-shadow">
                        <div className="w-full h-3 bg-[#EBECF0] rounded mb-2"></div>
                        <div className="w-3/4 h-3 bg-[#EBECF0] rounded mb-4"></div>
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] bg-[#EAE6FF] text-[#403294] px-2 py-1 rounded font-bold">URGENT</span>
                          <div className="w-6 h-6 rounded-full bg-[#FF5630] border-2 border-white flex justify-center items-center text-white text-[8px]">!</div>
                        </div>
                      </div>
                    </div>
                    <div className="w-1/3 bg-[#F4F5F7] rounded-lg p-3 flex flex-col gap-3">
                      <div className="text-xs font-semibold text-[#5E6C84] uppercase tracking-wider">In Progress</div>
                      <div className="bg-white p-3 rounded shadow-sm border border-[#0052CC] ring-1 ring-[#0052CC] cursor-pointer">
                        <div className="w-full h-3 bg-[#0052CC] opacity-20 rounded mb-2"></div>
                        <div className="w-1/2 h-3 bg-[#0052CC] opacity-20 rounded mb-4"></div>
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] bg-[#E3FCEF] text-[#006644] px-2 py-1 rounded font-bold">SUPPORT</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-1/3 bg-[#F4F5F7] rounded-lg p-3 flex flex-col gap-3">
                      <div className="text-xs font-semibold text-[#5E6C84] uppercase tracking-wider">Done</div>
                      <div className="bg-white p-3 rounded shadow-sm border border-[#DFE1E6] opacity-60">
                        <div className="w-full h-3 bg-[#EBECF0] rounded mb-2"></div>
                        <div className="w-2/3 h-3 bg-[#EBECF0] rounded mb-4"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating badges */}
              <Motion.div 
                style={{ y: y1 }}
                className="absolute -top-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-[#DFE1E6] flex items-center gap-3 backdrop-blur-md"
              >
                <div className="w-10 h-10 bg-[#E3FCEF] text-[#36B37E] rounded-full flex items-center justify-center">
                  <CheckCircle size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#172B4D]">Issue Resolved</p>
                  <p className="text-xs text-[#5E6C84]">Just now</p>
                </div>
              </Motion.div>

              <Motion.div 
                style={{ y: y2 }}
                className="absolute -bottom-10 -right-8 bg-white p-4 rounded-xl shadow-xl border border-[#DFE1E6] flex items-center gap-3 backdrop-blur-md"
              >
                <div className="w-10 h-10 bg-[#FFFAE6] text-[#FFAB00] rounded-full flex items-center justify-center">
                  <BarChart3 size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#172B4D]">Response Time</p>
                  <p className="text-xs text-[#36B37E] font-semibold">-24% this week</p>
                </div>
              </Motion.div>
            </Motion.div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-10 border-y border-[#DFE1E6] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold text-[#5E6C84] uppercase tracking-widest mb-6">Trusted by innovative teams worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale">
            <div className="flex items-center gap-2 text-xl font-bold text-[#172B4D]"><Globe2/> ACME Corp</div>
            <div className="flex items-center gap-2 text-xl font-bold text-[#172B4D]"><Users/> Globex</div>
            <div className="flex items-center gap-2 text-xl font-bold text-[#172B4D]"><Code/> Initech</div>
            <div className="flex items-center gap-2 text-xl font-bold text-[#172B4D]"><MessageSquare/> Soylent Corp</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-[#F4F5F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#172B4D] mb-4">Built for teams that deliver excellence</h2>
            <p className="text-lg text-[#42526E]">
              Everything you need to capture, track, and resolve complaints efficiently. Power your support workflows with enterprise-grade tools.
            </p>
          </div>

          <Motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              { icon: <LayoutDashboard />, title: 'Intuitive Boards', desc: 'Visualize your workflow and resolve issues faster with agile Kanban boards designed for support.' },
              { icon: <Zap />, title: 'Automated Rules', desc: 'Put manual tasks on autopilot. Create rules to auto-assign, transition, and escalate complaints.' },
              { icon: <Shield />, title: 'Enterprise Security', desc: 'Bank-grade security, role-based access control, and comprehensive audit logs keep your data safe.' },
              { icon: <BarChart3 />, title: 'Advanced Reporting', desc: 'Gain actionable insights with real-time dashboards, SLA tracking, and custom reporting tools.' },
              { icon: <Users />, title: 'Team Collaboration', desc: 'Keep everyone on the same page. Mention teammates, share attachments, and link related issues.' },
              { icon: <Globe2 />, title: 'Omnichannel Support', desc: 'Capture complaints from web forms, emails, and APIs into a single unified queue.' }
            ].map((feature, idx) => (
              <Motion.div 
                key={idx}
                variants={fadeInUp}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-[#DFE1E6] hover:-translate-y-1 cursor-pointer group"
              >
                <div className="w-12 h-12 bg-[#E9F2FF] text-[#0052CC] rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#0052CC] group-hover:text-white transition-all duration-300">
                  {React.cloneElement(feature.icon, { size: 24 })}
                </div>
                <h3 className="text-xl font-bold text-[#172B4D] mb-3">{feature.title}</h3>
                <p className="text-[#42526E] leading-relaxed">
                  {feature.desc}
                </p>
              </Motion.div>
            ))}
          </Motion.div>
        </div>
      </section>

      {/* Deep Dive Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2">
              <Motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-block bg-[#EAE6FF] text-[#403294] font-bold px-3 py-1 rounded-full text-sm mb-6">WORKFLOW ENGINE</div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#172B4D] mb-6">Customize to match your unique process</h2>
                <p className="text-lg text-[#42526E] mb-8">
                  Whether you're a startup or an enterprise, CivicResolve adapts to how you work. Create custom issue types, fields, and workflows tailored to your exact requirements.
                </p>
                <ul className="space-y-4 mb-8">
                  {['Drag-and-drop workflow builder', 'Custom fields and forms', 'Granular permission schemes', 'Integration with CI/CD tools'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-[#172B4D] font-medium">
                      <div className="text-[#36B37E]"><CheckCircle size={20} /></div>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link to="/register" className="inline-flex items-center gap-2 text-[#0052CC] font-bold hover:underline transition-all">
                  Explore workflow customization <ChevronRight size={18} />
                </Link>
              </Motion.div>
            </div>
            <div className="w-full lg:w-1/2 relative">
               {/* Mockup visual */}
               <Motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.6 }}
                 className="bg-[#F4F5F7] p-8 rounded-2xl border border-[#DFE1E6]"
               >
                 <div className="bg-white rounded-lg shadow-sm border border-[#DFE1E6] overflow-hidden">
                    <div className="bg-[#FAFBFC] border-b border-[#DFE1E6] px-4 py-3 font-semibold text-[#172B4D] flex justify-between">
                      Workflow: Enterprise Support
                      <span className="text-[#5E6C84] bg-[#EBECF0] px-2 py-0.5 rounded text-xs">V2.4</span>
                    </div>
                    <div className="p-8 relative min-h-[300px]">
                      {/* Simulating nodes in a workflow */}
                      <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-full border border-[#DFE1E6] shadow-sm font-medium text-sm z-10">
                        Open
                      </div>
                      <div className="absolute top-14 left-1/2 w-0.5 h-12 bg-[#DFE1E6] -translate-x-1/2"></div>
                      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#0052CC] rotate-45"></div>

                      <div className="absolute top-28 left-1/4 bg-[#E9F2FF] text-[#0052CC] font-medium px-4 py-2 rounded-full border border-[#B3D4FF] shadow-sm text-sm z-10 text-center">
                        In Progress
                      </div>
                      <div className="absolute top-28 right-1/4 bg-[#EAE6FF] text-[#403294] font-medium px-4 py-2 rounded-full border border-[#C0B6F2] shadow-sm text-sm z-10 text-center">
                        Escalated
                      </div>

                      {/* Connectors */}
                      <div className="absolute top-28 left-1/2 w-[25%] h-0.5 bg-[#DFE1E6] -translate-x-full"></div>
                      <div className="absolute top-28 right-1/2 w-[25%] h-0.5 bg-[#DFE1E6]"></div>
                      
                      <div className="absolute top-48 left-1/2 -translate-x-1/2 bg-[#E3FCEF] text-[#006644] font-medium px-4 py-2 rounded-full border border-[#79F2C0] shadow-sm text-sm z-10">
                        Resolved
                      </div>

                      <div className="absolute top-[138px] left-[30%] w-0.5 h-[54px] bg-[#DFE1E6] rotate-[-35deg]"></div>
                      <div className="absolute top-[138px] right-[30%] w-0.5 h-[54px] bg-[#DFE1E6] rotate-[35deg]"></div>
                    </div>
                 </div>
               </Motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#0052CC] to-[#0747A6] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.toptal.com/designers/subtlepatterns/uploads/square_bg.png')] opacity-10 mix-blend-overlay"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to transform your support?</h2>
          <p className="text-xl text-[#B3D4FF] mb-10 max-w-2xl mx-auto">
            Join thousands of teams that use CivicResolve to deliver exceptional service and resolve issues faster.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register" className="bg-white text-[#0052CC] hover:bg-[#F4F5F7] px-8 py-4 rounded font-bold text-lg transition-colors shadow-lg">
              Start your free trial
            </Link>
            <Link to="/demo" className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded font-bold text-lg transition-colors">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#172B4D] text-[#C1C7D0] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2 mb-6 text-white">
                <div className="w-8 h-8 rounded bg-[#0052CC] flex items-center justify-center font-bold text-xl">
                  C
                </div>
                <span className="text-2xl font-bold tracking-tight">CivicResolve</span>
              </div>
              <p className="text-sm max-w-xs leading-relaxed mb-6">
                The leading enterprise platform for complaint management, issue tracking, and workflow automation.
              </p>
              <div className="flex gap-4">
                <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
                <a href="#" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
                <a href="#" className="hover:text-white transition-colors"><Github size={20} /></a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Products</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-[#0052CC] transition-colors">Issue Tracker</a></li>
                <li><a href="#" className="hover:text-[#0052CC] transition-colors">Service Desk</a></li>
                <li><a href="#" className="hover:text-[#0052CC] transition-colors">Workflow Automation</a></li>
                <li><a href="#" className="hover:text-[#0052CC] transition-colors">Pricing</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Resources</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-[#0052CC] transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-[#0052CC] transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-[#0052CC] transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-[#0052CC] transition-colors">Blog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-[#0052CC] transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-[#0052CC] transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-[#0052CC] transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-[#0052CC] transition-colors">Partners</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#344563] pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
            <div className="mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} CivicResolve Inc. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-[#0052CC] transition-colors font-medium text-white flex items-center gap-1"><Globe2 size={12}/> English</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
