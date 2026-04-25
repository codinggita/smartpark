import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Map as MapIcon, 
  Calendar, 
  Car, 
  BarChart, 
  Settings,
  LogOut
} from 'lucide-react';

const RoleBasedSidebar = () => {
  const { userRole, logout } = useAuth();

  const userLinks = [
    { name: 'Map View', path: '/map', icon: <MapIcon size={20} /> },
    { name: 'Booking', path: '/booking', icon: <Calendar size={20} /> },
    { name: 'Valet Tracking', path: '/valet', icon: <Car size={20} /> },
  ];

  const adminLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Parking Management', path: '/management', icon: <Car size={20} /> },
    { name: 'Analytics', path: '/analytics', icon: <BarChart size={20} /> },
  ];

  const links = userRole === 'admin' ? adminLinks : userLinks;

  return (
    <aside className="w-64 bg-white border-r border-slate-200/50 flex flex-col h-[calc(100vh-5rem)] sticky top-20">
      <div className="flex-1 py-6 px-4 space-y-1">
        <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
          {userRole === 'admin' ? 'Admin Tools' : 'User Menu'}
        </p>
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`
            }
          >
            {link.icon}
            {link.name}
          </NavLink>
        ))}
      </div>
      <div className="p-4 border-t border-slate-100">
        <NavLink
          to="/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all"
        >
          <Settings size={20} />
          Settings
        </NavLink>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 mt-1 rounded-xl font-semibold text-red-600 hover:bg-red-50 transition-all"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default RoleBasedSidebar;
