import { Outlet, Link } from 'react-router-dom';
import { Car } from 'lucide-react';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-neutral-dark font-sans">
      {/* Embedded Navbar to save file count */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white/90 backdrop-blur-md border-b border-gray-200 z-50 flex items-center px-6 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-md shadow-primary/20">
            <Car className="text-white" size={24} />
          </div>
          <span className="text-xl font-bold text-primary tracking-tight">
            SmartPark
          </span>
        </div>

        <div className="ml-auto flex items-center gap-6">
          <Link to="/" className="text-neutral font-medium hover:text-primary transition-colors">Home</Link>
          <Link to="/login" className="px-4 py-2 rounded-lg bg-primary hover:bg-blue-700 text-white transition-colors font-medium text-sm shadow-sm shadow-primary/20">
            Sign In
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-16">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
