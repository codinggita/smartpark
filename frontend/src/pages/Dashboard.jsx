import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  LayoutDashboard,
  BarChart3,
  Map as MapIcon,
  Calendar,
  Users,
  Settings,
  Search,
  Bell,
  HelpCircle,
  Car,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Filter
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { bookingService } from '../services/apiService';

const Dashboard = () => {
  const { user, mongoUser, userRole } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (mongoUser?._id) {
        try {
          const response = await bookingService.getUserBookings(mongoUser._id);
          if (response.success) {
            setRecentBookings(response.data);
          }
        } catch (error) {
          console.error('Error fetching bookings:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [mongoUser]);

  const stats = [
    { label: 'System Capacity', value: '500', icon: <Car size={22} />, sub: 'Total Spots', color: 'text-indigo-600', bg: 'bg-indigo-50/50', trend: '+2.5%', trendUp: true },
    { label: 'Available Now', value: '142', icon: <CheckCircle2 size={22} />, sub: 'Real-time', color: 'text-emerald-600', bg: 'bg-emerald-50/50', trend: '-4.1%', trendUp: false },
    { label: 'Active Sessions', value: recentBookings.length.toString(), icon: <AlertCircle size={22} />, sub: 'Your Bookings', color: 'text-rose-600', bg: 'bg-rose-50/50', trend: '+12%', trendUp: true },
    { label: 'Total Spent', value: `₹${recentBookings.reduce((acc, b) => acc + (b.totalAmount || 0), 0)}`, icon: <TrendingUp size={22} />, sub: 'Net Spend', color: 'text-amber-600', bg: 'bg-amber-50/50', trend: '+8.4%', trendUp: true },
  ];

  return (
    <div className="flex min-h-screen bg-[#F1F5F9] font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-700">
      <Helmet>
        <title>Dashboard — SmartPark</title>
        <meta name="description" content="View your SmartPark dashboard. Monitor parking activity, bookings, and system performance." />
        <meta property="og:title" content="Dashboard — SmartPark" />
        <meta property="og:url" content="https://smartpark.app/dashboard" />
      </Helmet>
      {/* Sidebar */}
      <aside className="w-72 bg-white/80 backdrop-blur-xl border-r border-slate-200/60 hidden lg:flex flex-col sticky top-0 h-screen z-50">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <Car className="text-white" size={24} />
            </div>
            <h1 className="text-xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-800">
              SmartPark
            </h1>
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Intelligent Mobility</p>
        </div>

        <nav className="flex-grow px-4 space-y-1.5 mt-4">
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active={activeTab === 'Dashboard'} onClick={() => setActiveTab('Dashboard')} />
          {userRole === 'admin' && (
            <NavItem icon={<Settings size={20} />} label="Admin Console" active={activeTab === 'Admin'} onClick={() => navigate('/admin')} />
          )}
          <NavItem icon={<BarChart3 size={20} />} label="Analytics" active={activeTab === 'Analytics'} onClick={() => setActiveTab('Analytics')} />
          <NavItem icon={<MapIcon size={20} />} label="Live Map" active={activeTab === 'Live Map'} onClick={() => navigate('/map')} />
          <NavItem icon={<Calendar size={20} />} label="Bookings" active={activeTab === 'Bookings'} onClick={() => navigate('/booking')} />
          <NavItem icon={<Users size={20} />} label="Customer Insights" active={activeTab === 'Customers'} onClick={() => setActiveTab('Customers')} />

          <div className="pt-8 pb-2 px-4">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Preferences</p>
          </div>
          <NavItem icon={<Settings size={20} />} label="System Settings" active={activeTab === 'Settings'} onClick={() => setActiveTab('Settings')} />
          <NavItem icon={<HelpCircle size={20} />} label="Support Center" active={activeTab === 'Support'} onClick={() => setActiveTab('Support')} />
        </nav>

        <div className="p-6 mt-auto">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-5 shadow-xl relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
            <p className="text-xs font-medium text-slate-400 mb-1">Current Plan</p>
            <h4 className="text-sm font-bold text-white mb-4">Enterprise Hub</h4>
            <button className="w-full py-2 bg-indigo-500 hover:bg-indigo-400 text-white text-xs font-bold rounded-lg transition-colors shadow-lg shadow-indigo-900/20">
              Upgrade System
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 lg:p-10 max-w-[1600px] mx-auto w-full">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-1">Executive Overview</h2>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span className="flex items-center gap-1.5"><Calendar size={14} /> {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
              <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
              <span className="text-indigo-600 font-semibold">System Online</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
              <input
                type="text"
                placeholder="Search metrics, valet IDs..."
                className="pl-12 pr-6 py-3 bg-white border border-slate-200/80 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 w-72 text-sm transition-all shadow-sm"
              />
            </div>
            <button className="p-3 bg-white text-slate-500 hover:text-indigo-600 border border-slate-200/80 rounded-2xl transition-all hover:shadow-md relative group">
              <Bell size={20} />
              <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white animate-pulse"></span>
            </button>
            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black text-slate-800">{user?.name || 'Guest User'}</p>
                <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">{mongoUser?.role || 'Member'}</p>
              </div>
              <img src={user?.photoURL || `https://i.pravatar.cc/150?u=${user?.uid || 'guest'}`} className="w-12 h-12 rounded-2xl border-2 border-white shadow-md object-cover" alt="User" />
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-7 rounded-[2rem] border border-white/60 shadow-xl shadow-slate-200/50 flex flex-col group hover:translate-y-[-4px] transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} transition-colors group-hover:bg-indigo-600 group-hover:text-white`}>
                  {stat.icon}
                </div>
                <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${stat.trendUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                  {stat.trendUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {stat.trend}
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                <h3 className="text-4xl font-black text-slate-900 mb-1">{stat.value}</h3>
                <p className="text-xs font-medium text-slate-500">{stat.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-10">
          {/* Main Chart */}
          <div className="xl:col-span-2 bg-white p-8 rounded-[2.5rem] border border-white/60 shadow-xl shadow-slate-200/50">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h4 className="text-lg font-black text-slate-900 tracking-tight">Occupancy Velocity</h4>
                <p className="text-sm text-slate-500">Real-time usage vs historical peaks</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-indigo-600 bg-slate-50 rounded-xl transition-colors flex items-center gap-2 border border-slate-100">
                  <Filter size={14} /> Hourly
                </button>
                <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>
            {/* Visual simulation of a chart */}
            <div className="h-72 w-full flex items-end justify-between gap-3 px-2">
              {[40, 65, 45, 80, 55, 95, 70, 85, 50, 75, 90, 60].map((h, i) => (
                <div key={i} className="flex-grow group relative">
                  <div
                    style={{ height: `${h}%` }}
                    className={`w-full rounded-t-xl transition-all duration-500 group-hover:opacity-80 cursor-pointer ${i === 5 ? 'bg-indigo-600' : 'bg-slate-200/70'
                      }`}
                  ></div>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {h}%
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-6 px-1">
              {['8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'].map(t => (
                <span key={t} className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{t}</span>
              ))}
            </div>
          </div>

          {/* Side Visualization */}
          <div className="bg-gradient-to-br from-indigo-700 to-violet-900 p-8 rounded-[2.5rem] shadow-xl shadow-indigo-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="relative z-10 h-full flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <h4 className="text-lg font-bold text-white tracking-tight">Demand Heatmap</h4>
                <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center text-white">
                  <MapIcon size={20} />
                </div>
              </div>

              <div className="flex-grow flex items-center justify-center">
                <div className="relative">
                  <div className="w-48 h-48 border-4 border-white/10 rounded-full animate-[spin_20s_linear_infinite]"></div>
                  <div className="w-32 h-32 border-4 border-white/20 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-amber-400 rounded-full shadow-[0_0_15px_rgba(251,191,36,0.8)] animate-pulse"></div>
                  <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-emerald-400 rounded-full shadow-[0_0_15px_rgba(52,211,153,0.8)] animate-pulse delay-700"></div>
                  <div className="absolute top-1/2 right-1/3 w-5 h-5 bg-rose-400 rounded-full shadow-[0_0_15px_rgba(251,113,133,0.8)] animate-pulse delay-1000"></div>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest">Peak Zone</p>
                    <p className="text-sm font-bold text-white">North Wing A</p>
                  </div>
                  <ChevronRight className="text-indigo-300" size={18} />
                </div>
                <button 
                  onClick={() => navigate('/map')}
                  className="w-full py-3 bg-white text-indigo-700 font-bold text-sm rounded-2xl hover:bg-indigo-50 transition-colors shadow-lg"
                >
                  Explore Full Map
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-[2.5rem] border border-white/60 shadow-xl shadow-slate-200/50 overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-xl font-black text-slate-900 tracking-tight">Your Recent Bookings</h4>
              <p className="text-sm text-slate-500">Live feed of your parking activity</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-5 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg shadow-slate-900/20">
                Generate Report
              </button>
              <button className="p-2.5 bg-slate-50 text-slate-400 border border-slate-100 rounded-xl hover:text-slate-600 transition-colors">
                <MoreVertical size={20} />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <tr>
                  <th className="px-8 py-5">Booking ID</th>
                  <th className="px-8 py-5">Vehicle / License</th>
                  <th className="px-8 py-5">Parking Zone</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5">Date & Time</th>
                  <th className="px-8 py-5 text-right">Fee Paid</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-8 py-10 text-center text-slate-400 font-bold">Loading your activity...</td>
                  </tr>
                ) : recentBookings.length > 0 ? (
                  recentBookings.map((booking, i) => (
                    <tr key={i} className="group hover:bg-indigo-50/30 transition-all cursor-pointer">
                      <td className="px-8 py-5">
                        <span className="text-xs font-black text-slate-400 group-hover:text-indigo-600 transition-colors">#{booking._id.slice(-6).toUpperCase()}</span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                            <Car size={20} />
                          </div>
                          <div>
                            <p className="text-sm font-black text-slate-800">{booking.licensePlate}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Verified Vehicle</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                          <span className="text-sm font-bold text-slate-700">{booking.zoneId?.name || 'Assigned Zone'}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm ${
                          booking.status === 'confirmed'
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                            : 'bg-amber-50 text-amber-600 border border-amber-100'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-sm text-slate-500 font-bold">{booking.date} at {booking.time}</span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <span className="text-sm font-black text-slate-900">₹{booking.totalAmount}</span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-8 py-10 text-center text-slate-400 font-bold">No recent bookings found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="p-6 bg-slate-50/50 flex items-center justify-center">
            <button className="text-xs font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
              Load Full Transaction History <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, active = false, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3.5 px-5 py-4 rounded-2xl transition-all group ${active
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 translate-x-1'
        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
      }`}
  >
    <span className={`${active ? 'text-white' : 'text-slate-400 group-hover:text-indigo-500'} transition-colors`}>
      {icon}
    </span>
    <span className={`text-sm ${active ? 'font-black' : 'font-bold'}`}>{label}</span>
    {active && <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full"></div>}
  </button>
);

export default Dashboard;
