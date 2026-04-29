import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Users, 
  BarChart3, 
  Car, 
  Calendar, 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  RefreshCcw,
  IndianRupee,
  LayoutDashboard
} from 'lucide-react';
import { bookingService, valetService } from '../services/apiService';

const AdminPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const fetchAllBookings = async () => {
    setLoading(true);
    try {
      const response = await bookingService.getAllBookings();
      if (response.success) {
        setBookings(response.data);
      }
    } catch (error) {
      console.error('Error fetching all bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBookings();
  }, []);

  const handleUpdateStatus = async (bookingId, newStatus) => {
    try {
      const response = await bookingService.updateStatus(bookingId, { status: newStatus });
      if (response.success) {
        // If it's a valet booking and we are moving to picked_up or parked, update valet service too
        const booking = bookings.find(b => b._id === bookingId);
        if (booking?.zoneId?.type === 'valet') {
          await valetService.updateValetStatus(bookingId, { status: newStatus });
        }
        fetchAllBookings();
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.userId?.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking._id.includes(searchTerm);
    
    const matchesFilter = filterStatus === 'all' || booking.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const totalRevenue = bookings.reduce((acc, b) => acc + (b.totalAmount || 0), 0);
  const activeBookings = bookings.filter(b => b.status === 'confirmed' || b.status === 'pending').length;

  return (
    <div className="h-full flex flex-col p-6 overflow-y-auto bg-slate-50/50">
      <Helmet>
        <title>Admin Console — SmartPark</title>
        <meta name="description" content="SmartPark admin console. Manage platform-wide parking operations, bookings, and revenue." />
        <meta property="og:title" content="Admin Console — SmartPark" />
        <meta property="og:url" content="https://smartpark.app/admin" />
      </Helmet>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Admin Console</h1>
          <p className="text-slate-500 mt-1">Manage platform-wide parking operations and revenue</p>
        </div>
        <button 
          onClick={fetchAllBookings}
          className="p-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all flex items-center gap-2 text-slate-600 font-bold text-sm shadow-sm"
        >
          <RefreshCcw size={18} className={loading ? 'animate-spin' : ''} />
          Refresh Data
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-3xl border border-white shadow-xl shadow-slate-200/50">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
              <IndianRupee size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Revenue</p>
              <h3 className="text-2xl font-black text-slate-900">₹{totalRevenue.toLocaleString('en-IN')}</h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-white shadow-xl shadow-slate-200/50">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
              <Calendar size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Bookings</p>
              <h3 className="text-2xl font-black text-slate-900">{bookings.length}</h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-white shadow-xl shadow-slate-200/50">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Ops</p>
              <h3 className="text-2xl font-black text-slate-900">{activeBookings}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Main Table Section */}
      <div className="bg-white rounded-[2.5rem] border border-white shadow-xl shadow-slate-200/50 overflow-hidden flex-grow flex flex-col">
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative group flex-grow max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
            <input
              type="text"
              placeholder="Search by license, customer or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-3 bg-slate-50 border-none rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 text-sm transition-all"
            />
          </div>
          <div className="flex items-center gap-3">
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-600 outline-none focus:ring-4 focus:ring-indigo-500/10"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
              <option value="parked">Parked</option>
            </select>
            <button className="p-3 bg-slate-900 text-white rounded-2xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20">
              <Filter size={20} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto flex-grow">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest sticky top-0 z-10">
              <tr>
                <th className="px-8 py-5">Booking Details</th>
                <th className="px-8 py-5">Customer</th>
                <th className="px-8 py-5">Zone</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5">Duration</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                Array(5).fill(0).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan="6" className="px-8 py-6 bg-white">
                      <div className="h-10 bg-slate-50 rounded-xl w-full"></div>
                    </td>
                  </tr>
                ))
              ) : filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <tr key={booking._id} className="group hover:bg-indigo-50/30 transition-all">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                          <Car size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-800 uppercase">{booking.licensePlate}</p>
                          <p className="text-[10px] font-bold text-slate-400">ID: #{booking._id.slice(-6).toUpperCase()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <p className="text-sm font-bold text-slate-700">{booking.userId?.displayName || 'Guest User'}</p>
                      <p className="text-xs text-slate-400">{booking.userId?.email || 'N/A'}</p>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                        booking.zoneId?.type === 'valet' ? 'bg-amber-100 text-amber-700' : 'bg-indigo-100 text-indigo-700'
                      }`}>
                        {booking.zoneId?.name || 'Unknown'}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <select 
                        value={booking.status}
                        onChange={(e) => handleUpdateStatus(booking._id, e.target.value)}
                        className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border-none outline-none ring-1 shadow-sm ${
                          booking.status === 'confirmed' ? 'bg-emerald-50 text-emerald-600 ring-emerald-100' :
                          booking.status === 'parked' ? 'bg-indigo-50 text-indigo-600 ring-indigo-100' :
                          booking.status === 'cancelled' ? 'bg-rose-50 text-rose-600 ring-rose-100' :
                          'bg-amber-50 text-amber-600 ring-amber-100'
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="picked_up">Picked Up</option>
                        <option value="parked">Parked</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-8 py-5">
                      <p className="text-sm font-bold text-slate-600">{booking.duration} hrs</p>
                      <p className="text-[10px] text-slate-400">{booking.date}</p>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-8 py-20 text-center text-slate-400 font-bold">No operations match your criteria.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
