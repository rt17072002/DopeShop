import React, { useState } from 'react';
import { 
  LayoutDashboard, ShoppingBag, ListOrdered, Package, 
  Menu, X, DollarSign, Clock, TrendingUp, Bell,
  ArrowUpRight, Users, LogOut, ChevronRight, ChevronDown, ChevronUp
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useContext } from 'react';
import { AppContext } from '../context.jsx/AppContext';

const Dashboard = () => {

 const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showAllOrders, setShowAllOrders] = useState(false);

  const {products, orders} = useContext(AppContext);

  const stats = [
    { title: "Total Products", value: products.length, icon: <Package size={22} />, color: "bg-blue-50 text-blue-600", trend: "+12%" },
    { title: "Total Revenue", value: orders.reduce((sum, o)=>o.totalAmount, 0), icon: <DollarSign size={22} />, color: "bg-emerald-50 text-emerald-600", trend: "+8.4%" },
    { title: "Total Orders", value: "856", icon: <ListOrdered size={22} />, color: "bg-indigo-50 text-indigo-600", trend: "+14%" },
    { title: "Pending Orders", value: "12", icon: <Clock size={22} />, color: "bg-amber-50 text-amber-600", trend: "-2%" },
  ];

  // Mock data: initial view (3) vs expanded view (8)
  const orderData = showAllOrders 
    ? [1, 2, 3, 4, 5, 6, 7, 8] 
    : [1, 2, 3];

  return (
  <div className="min-h-screen bg-gray-50 font-sans flex overflow-hidden">
      
      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        
        <header className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between sticky top-0 z-40">
          <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-2 bg-gray-100 rounded-lg"><Menu size={20} /></button>
          
          <div className="hidden md:flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest">
            Dashboard
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2.5 text-gray-400 hover:bg-gray-50 rounded-xl relative transition-all">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 border-2 border-white rounded-full"></span>
            </button>
            
            {/* PROFILE BUTTON (Settings Removed) */}
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 p-1 pr-3 hover:bg-gray-50 rounded-2xl transition-all"
              >
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-indigo-100">AD</div>
                <div className="text-left hidden sm:block">
                  <p className="text-xs font-black text-gray-900 leading-none">Admin User</p>
                  <p className="text-[10px] font-bold text-indigo-400">Manage Account</p>
                </div>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-3xl shadow-2xl border border-gray-100 p-2 z-50 animate-in fade-in zoom-in-95">
                  <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-600 hover:bg-gray-50 rounded-2xl transition-all">
                    <Users size={18} /> My Profile
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-rose-500 hover:bg-rose-50 rounded-2xl transition-all">
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="p-6 md:p-8 space-y-8 max-w-7xl">
          
          {/* STAT TILES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-2xl ${stat.color}`}>{stat.icon}</div>
                  <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${stat.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-500' : 'bg-rose-50 text-rose-500'}`}>
                    {stat.trend}
                  </span>
                </div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">{stat.title}</p>
                <h3 className="text-2xl font-black text-gray-900">{stat.value}</h3>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* EXPANDABLE RECENT ORDERS */}
            <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden transition-all duration-500 ease-in-out">
              <div className="p-8 pb-4 flex items-center justify-between border-b border-gray-50">
                <div>
                  <h3 className="font-black text-gray-900 text-xl tracking-tighter uppercase">Recent Activity</h3>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Order Stream</p>
                </div>
                
                {/* DYNAMIC VIEW ALL BUTTON */}
                <button 
                  onClick={() => setShowAllOrders(!showAllOrders)}
                  className="group flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                >
                  {showAllOrders ? 'Show Less' : 'View All'}
                  {showAllOrders ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50/50">
                    <tr className="text-gray-400 text-[9px] font-black uppercase tracking-[0.2em]">
                      <th className="px-8 py-4">Transaction ID</th>
                      <th className="px-8 py-4">Customer</th>
                      <th className="px-8 py-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {orderData.map((item, i) => (
                      <tr key={item} className="animate-in slide-in-from-top-2 duration-300">
                        <td className="px-8 py-5 text-sm font-black text-gray-900">#TRX-00{item}</td>
                        <td className="px-8 py-5 text-sm font-bold text-gray-600">Client_{item}</td>
                        <td className="px-8 py-5 text-right">
                          <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[9px] font-black uppercase rounded-lg">Verified</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* BESTSELLERS */}
            <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white shadow-2xl h-fit">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-black text-xl tracking-tighter uppercase">Trending</h3>
                <TrendingUp size={20} className="text-indigo-400" />
              </div>

              <div className="space-y-4">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-3xl hover:bg-white/10 transition-all group cursor-pointer border border-white/5">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-black">P{i+1}</div>
                    <div className="flex-1">
                      <p className="text-xs font-black truncate">Item Name {i+1}</p>
                      <p className="text-[9px] font-bold text-gray-500 uppercase">Top 1% Seller</p>
                    </div>
                    <ArrowUpRight size={14} className="text-emerald-500" />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>

      {(isSidebarOpen || isProfileOpen) && <div onClick={() => {setIsSidebarOpen(false); setIsProfileOpen(false)}} className="fixed inset-0 bg-gray-900/10 backdrop-blur-[2px] z-30 md:hidden" />}
    </div>
      );
    };


export default Dashboard
