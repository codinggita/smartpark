import { Outlet, Link, useLocation } from 'react-router-dom';
import { Car } from 'lucide-react';

const Layout = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  // If we are on dashboard, we might not want the default layout navbar 
  // as the dashboard has its own sidebar. But for now, let's just make it look good.
  if (isDashboard) return <Outlet />;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-700 antialiased">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 h-20 bg-white/70 backdrop-blur-xl border-b border-slate-200/50 z-50 flex items-center px-8 lg:px-16 transition-all duration-300">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 flex items-center justify-center shadow-xl shadow-indigo-200 group-hover:scale-105 transition-transform duration-300">
            <Car className="text-white" size={24} />
          </div>
          <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-800 tracking-tight">
            SmartPark
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-8">
          <Link to="/" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">Platform</Link>
          <Link to="/" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">Pricing</Link>
          <Link to="/login" className="text-sm font-bold text-slate-900 hover:text-indigo-600 transition-colors">Sign In</Link>
          <Link to="/signup" className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white transition-all font-bold text-sm shadow-xl shadow-slate-200 hover:translate-y-[-2px]">
            Join Now
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-20">
        <Outlet />
      </main>

      {/* Simple Footer */}
      <footer className="py-12 px-8 lg:px-16 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-50">
            <Car size={18} />
            <span className="text-sm font-bold uppercase tracking-widest">SmartPark &copy; 2026</span>
          </div>
          <div className="flex items-center gap-8 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
