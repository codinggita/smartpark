import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Users, 
  BarChart3, 
  Car, 
  TrendingUp, 
  ShieldCheck, 
  Search, 
  Filter, 
  MoreVertical,
  Download,
  Plus,
  RefreshCcw
} from 'lucide-react';
import { parkingService, bookingService, valetService } from '../services/apiService';
import { useTheme } from '../context/ThemeContext';

const AdminPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [zones, setZones] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [zonesRes, bookingsRes] = await Promise.all([
        parkingService.getZones(),
        bookingService.getAllBookings()
      ]);
      if (zonesRes.success) setZones(zonesRes.data);
      if (bookingsRes.success) setBookings(bookingsRes.data);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateStatus = async (bookingId, newStatus) => {
    try {
      const response = await bookingService.updateStatus(bookingId, { status: newStatus });
      if (response.success) {
        // If it's a valet booking, update valet status too
        const booking = bookings.find(b => b._id === bookingId);
        if (booking?.zoneId?.type === 'valet') {
          await valetService.updateValetStatus(bookingId, { status: newStatus });
        }
        fetchData();
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (booking.userId?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking._id.includes(searchTerm);
    
    const matchesFilter = filterStatus === 'all' || booking.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const stats = [
    { label: 'Total Revenue', value: `₹${bookings.reduce((acc, b) => acc + (b.totalAmount || 0), 0)}`, icon: <TrendingUp size={20} />, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
    { label: 'Total Bookings', value: bookings.length.toString(), icon: <ShieldCheck size={20} />, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Active Zones', value: zones.length.toString(), icon: <Car size={20} />, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { label: 'Platform Users', value: '1,284', icon: <Users size={20} />, color: 'text-rose-500', bg: 'bg-rose-500/10' },
  ];

  return (
    <div className={`h-full flex flex-col p-6 lg:p-10 overflow-y-auto transition-colors duration-300 ${isDark ? 'bg-slate-900 text-slate-100' : 'bg-[#F8FAFC] text-slate-900'}`}>
      <Helmet>
        <title>Admin Console — SmartPark</title>
        <meta name="description" content="SmartPark admin console. Manage platform-wide parking operations, bookings, and revenue." />
      </Helmet>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className={`text-3xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>Admin Console</h1>
          <p className={`mt-1 font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>System-wide operations and revenue management</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={fetchData}
            className={`p-2.5 rounded-xl border transition-all ${isDark ? 'bg-slate-800 border-slate-700 text-slate-400 hover:text-indigo-400' : 'bg-white border-slate-200 text-slate-400 hover:text-indigo-600'}`}
          >
            <RefreshCcw size={18} className={loading ? 'animate-spin' : ''} />
          </button>
          <button className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 border transition-all ${isDark ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
            <Download size={16} /> Export
          </button>
          <button className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-indigo-500/20 transition-all">
            <Plus size={16} /> Add Zone
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => (
          <div key={i} className={`p-6 rounded-3xl border shadow-sm transition-all hover:shadow-md ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${stat.bg} ${stat.color}`}>
              {stat.icon}
            </div>
            <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${isDark ? 'text-slate-50' : 'text-slate-400'}`}>{stat.label}</p>
            <h3 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div className={`rounded-[2rem] border shadow-sm overflow-hidden transition-colors ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
        <div className={`p-6 border-b flex flex-col md:flex-row md:items-center justify-between gap-4 ${isDark ? 'border-slate-700' : 'border-slate-50'}`}>
          <div className="relative group flex-grow max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search bookings..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-xl border text-sm outline-none transition-all ${isDark ? 'bg-slate-700 border-slate-600 text-white focus:border-indigo-500' : 'bg-slate-50 border-slate-100 focus:border-indigo-500'}`}
            />
          </div>
          <div className="flex items-center gap-2">
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={`px-4 py-2 rounded-xl border text-sm font-bold outline-none transition-all ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-100 text-slate-600'}`}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="parked">Parked</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <button className={`p-2 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-slate-400' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
              <Filter size={18} />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'bg-slate-900/50 text-slate-500' : 'bg-slate-50/50 text-slate-400'}`}>
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Vehicle</th>
                <th className="px-6 py-4">Zone</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Fee</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-slate-700' : 'divide-slate-50'}`}>
              {loading ? (
                Array(5).fill(0).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan="6" className="px-6 py-4"><div className={`h-8 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`}></div></td>
                  </tr>
                ))
              ) : filteredBookings.map((booking) => (
                <tr key={booking._id} className={`group transition-colors ${isDark ? 'hover:bg-slate-700/50' : 'hover:bg-slate-50/50'}`}>
                  <td className="px-6 py-4">
                    <span className="text-xs font-mono font-bold text-slate-400">#{booking._id.slice(-6).toUpperCase()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? 'bg-slate-700 text-slate-500' : 'bg-slate-100 text-slate-400'}`}>
                        <Car size={18} />
                      </div>
                      <div>
                        <p className={`text-sm font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{booking.licensePlate}</p>
                        <p className="text-[10px] text-slate-500 uppercase">{booking.userId?.name || 'Customer'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{booking.zoneId?.name || 'Standard'}</span>
                  </td>
                  <td className="px-6 py-4">
                    <select 
                      value={booking.status}
                      onChange={(e) => handleUpdateStatus(booking._id, e.target.value)}
                      className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg outline-none border-none ring-1 ${
                        booking.status === 'confirmed' 
                          ? 'bg-emerald-500/10 text-emerald-500 ring-emerald-500/20' 
                          : booking.status === 'cancelled'
                            ? 'bg-rose-500/10 text-rose-500 ring-rose-500/20'
                            : 'bg-amber-500/10 text-amber-500 ring-amber-500/20'
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="picked_up">Picked Up</option>
                      <option value="parked">Parked</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right font-black text-sm">₹{booking.totalAmount}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 text-slate-400 hover:text-indigo-500 transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
