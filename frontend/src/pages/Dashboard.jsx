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
  AlertCircle
} from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { label: 'TOTAL SPOTS', value: '500', icon: <Car size={20} />, sub: 'System Capacity', color: 'bg-blue-50 text-blue-600' },
    { label: 'AVAILABLE', value: '142', icon: <CheckCircle2 size={20} />, sub: '28.4% Available', color: 'bg-green-50 text-green-600', trend: 'text-green-600' },
    { label: 'OCCUPIED', value: '358', icon: <AlertCircle size={20} />, sub: '71.6% Occupied', color: 'bg-red-50 text-red-600', trend: 'text-red-600' },
    { label: 'DAILY REVENUE', value: '$2,450', icon: <TrendingUp size={20} />, sub: '+12% vs yesterday', color: 'bg-indigo-50 text-indigo-600', trend: 'text-green-600' },
  ];

  const recentBookings = [
    { user: 'Michael Chen', spot: 'A1-042', status: 'Self-Park', time: '10:24 AM', revenue: '$12.50', avatar: 'https://i.pravatar.cc/150?u=michael' },
    { user: 'Sarah Jenkins', spot: 'V-105', status: 'Valet', time: '09:15 AM', revenue: '$35.00', avatar: 'https://i.pravatar.cc/150?u=sarah' },
    { user: 'Emily Davis', spot: 'B2-011', status: 'Self-Park', time: '08:45 AM', revenue: '$18.00', avatar: 'https://i.pravatar.cc/150?u=emily' },
    { user: 'Robert Johnson', spot: 'C1-088', status: 'Self-Park', time: '08:12 AM', revenue: '$15.00', avatar: 'https://i.pravatar.cc/150?u=robert' },
  ];

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-6">
          <h1 className="text-xl font-bold text-blue-600">SmartPark Admin</h1>
          <p className="text-xs text-gray-500 font-medium">Management Console</p>
        </div>
        
        <nav className="flex-grow px-4 space-y-1">
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
          <NavItem icon={<BarChart3 size={20} />} label="Analytics" />
          <NavItem icon={<MapIcon size={20} />} label="Map View" />
          <NavItem icon={<Calendar size={20} />} label="Bookings" />
          <NavItem icon={<Users size={20} />} label="Users" />
          <NavItem icon={<Settings size={20} />} label="Settings" />
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 p-2">
            <img src="https://i.pravatar.cc/150?u=admin" className="w-10 h-10 rounded-full border border-gray-200" alt="Admin" />
            <div>
              <p className="text-sm font-bold text-gray-700">Admin User</p>
              <p className="text-xs text-gray-500">System Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8 overflow-y-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
            <p className="text-sm text-gray-500">Real-time parking analytics and system performance.</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search bookings, users..." 
                className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 w-64 text-sm"
              />
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <HelpCircle size={20} />
            </button>
          </div>
        </header>

        {/* Filters */}
        <div className="flex justify-end gap-3 mb-6">
          <select className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-600 focus:outline-none">
            <option>All Locations</option>
          </select>
          <select className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-600 focus:outline-none">
            <option>Today</option>
          </select>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start justify-between">
              <div>
                <p className="text-xs font-bold text-gray-500 tracking-wider mb-1">{stat.label}</p>
                <h3 className="text-3xl font-extrabold text-gray-800">{stat.value}</h3>
                <div className="flex items-center gap-1 mt-2">
                  <span className={`text-xs font-bold ${stat.trend || 'text-gray-500'}`}>{stat.sub}</span>
                </div>
              </div>
              <div className={`p-3 rounded-xl ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
          {/* Chart Placeholder 1 */}
          <div className="xl:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-bold text-gray-800">Parking Usage Over Time</h4>
              <div className="flex items-center gap-4 text-xs font-medium">
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-600"></span> Today</div>
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-gray-300"></span> Yesterday</div>
              </div>
            </div>
            <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center border border-dashed border-gray-200">
              <p className="text-gray-400 text-sm">Parking Usage Chart Visualization</p>
            </div>
          </div>

          {/* Chart Placeholder 2 */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-bold text-gray-800">Busy Zones Heatmap</h4>
              <button className="text-gray-400 hover:text-gray-600"><TrendingUp size={18} /></button>
            </div>
            <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center border border-dashed border-gray-200">
              <p className="text-gray-400 text-sm">Heatmap Visualization</p>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <h4 className="font-bold text-gray-800">Recent Bookings</h4>
            <button className="text-sm font-bold text-blue-600 hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50/50 text-xs font-bold text-gray-400 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Spot ID</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Time</th>
                  <th className="px-6 py-4 text-right">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentBookings.map((booking, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={booking.avatar} className="w-8 h-8 rounded-full border border-gray-100" alt={booking.user} />
                        <span className="text-sm font-bold text-gray-700">{booking.user}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-500">{booking.spot}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        booking.status === 'Valet' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-500 font-medium">{booking.time}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-bold text-gray-800">{booking.revenue}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, active = false }) => (
  <a href="#" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
    active 
      ? 'bg-blue-50 text-blue-600 shadow-sm shadow-blue-100/50' 
      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
  }`}>
    <span className={active ? 'text-blue-600' : 'text-gray-400'}>{icon}</span>
    <span className="text-sm font-bold">{label}</span>
  </a>
);

export default Dashboard;
