import React, { useState } from 'react';
import {
  LayoutDashboard, ShoppingBag, ListOrdered, Package,
  Menu, X, Search, Filter, Eye, EyeOff, Trash2,
  ChevronLeft, ChevronRight, Users, Download, ChevronDown
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useContext } from 'react';
import { AppContext } from '../context.jsx/AppContext';
import axios from 'axios';
import {useNavigate} from "react-router-dom"


const Orders = () => {

  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isSidebarOpen, setIsSidebarOpen } = useContext(AppContext);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [statusMenuId, setStatusMenuId] = useState(null);
  const navigate = useNavigate();

  const { orders, fetchOrders, backendUrl } = useContext(AppContext);
  console.log(orders);

  const deleteOrder = async (id) => {
    // setOrders(orders.filter(order => order._id !== id));
    try {
      await axios.delete(`${backendUrl}/api/orders/${id}`);
      fetchOrders();
    } catch (error) {
      console.log(error);
      alert("Status update failed")
    }
  };

  const updateStatus = async (id, newStatus) => {
    // setOrders(orders.map(order => order._id === id ? { ...order, status: newStatus } : order));
    try {
      const res = await axios.put(`${backendUrl}/api/orders/${id}/status`, { orderStatus: newStatus });
      console.log(res.data);
      fetchOrders();
    } catch (error) {
      console.log(error);
      alert("Status update failed")
    }
    setStatusMenuId(null);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Shipped': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'Processing': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'Cancelled': return 'bg-rose-50 text-rose-600 border-rose-100';
      default: return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex overflow-hidden">

      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
          <h1 className="text-xl font-black text-gray-900">Order Management</h1>
          <button onClick={()=>navigate("/") } className="bg-green-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-indigo-100 transition-all">
            <span className="hidden sm:inline">Products</span>
          </button>
        </header>

        <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50/50">
                  <tr className="text-gray-400 text-[10px] uppercase tracking-widest">
                    <th className="px-6 py-5 font-black">Order ID</th>
                    <th className="px-6 py-5 font-black">Customer</th>
                    <th className="px-6 py-5 font-black">Total</th>
                    <th className="px-6 py-5 font-black">Status</th>
                    <th className="px-6 py-5 font-black text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {orders.map((order) => (
                    <React.Fragment key={order._id}>
                      <tr className={`group transition-colors ${expandedOrderId === order._id ? 'bg-indigo-50/30' : 'hover:bg-gray-50'}`}>
                        <td className="px-6 py-5 font-black text-gray-900 text-sm">#{order._id}</td>
                        <td className="px-6 py-5 font-bold text-gray-700 text-sm">{order.customer.name}</td>
                        <td className="px-6 py-5 font-black text-gray-900">${order.totalAmount.toFixed(2)}</td>

                        {/* INTERACTIVE STATUS */}
                        <td className="px-6 py-5 relative">
                          <button
                            onClick={() => setStatusMenuId(statusMenuId === order._id ? null : order._id)}
                            className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase border flex items-center gap-2 transition-all ${getStatusStyle(order.orderStatus)}`}
                          >
                            {order.orderStatus}
                            <ChevronDown size={12} />
                          </button>

                          {statusMenuId === order._id && (
                            <div className="absolute top-14 left-6 w-40 bg-white shadow-2xl rounded-2xl border border-gray-100 z-50 p-2 space-y-1">
                              {['Processing', 'Shipped', 'Delivered', 'Cancelled'].map(s => (
                                <button
                                  key={s}
                                  onClick={() => updateStatus(order._id, s)}
                                  className="w-full text-left px-4 py-2 text-[10px] font-black uppercase rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                                >
                                  {s}
                                </button>
                              ))}
                            </div>
                          )}
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => setExpandedOrderId(expandedOrderId === order._id ? null : order._id)}
                              className={`p-2 rounded-xl transition-all ${expandedOrderId === order._id ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-500 hover:text-indigo-600'}`}
                            >
                              {expandedOrderId === order._id ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                            <button
                              onClick={() => deleteOrder(order._id)}
                              className="p-2 bg-gray-100 text-gray-500 hover:bg-rose-50 hover:text-rose-600 rounded-xl transition-all"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* EXPANDED COMPONENT */}
                      {expandedOrderId === order._id && (
                        <tr>
                          <td colSpan="5" className="px-8 py-8 bg-indigo-50/20">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-top-4">
                              <div className="space-y-4">
                                <h4 className="text-xs font-black text-indigo-600 uppercase tracking-widest">Customer Details</h4>
                                <div className="bg-white p-6 rounded-3xl border border-indigo-100 shadow-sm">
                                  <p className="font-bold text-gray-900">{order.customer.name}</p>
                                  <p className="text-sm text-gray-500">{order.customer.email}</p>
                                  <p className="text-sm text-gray-500 mt-2">{order.customer.address}</p>
                                  <p className="text-xs font-bold text-indigo-500 mt-4 uppercase tracking-tighter">Paid via {order.paymentMethod}</p>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <h4 className="text-xs font-black text-indigo-600 uppercase tracking-widest">Order Items</h4>
                                <div className="bg-white rounded-3xl border border-indigo-100 shadow-sm overflow-hidden">
                                  {order.items.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center p-4 border-b border-gray-50 last:border-0">
                                      <div>
                                        <p className="text-sm font-bold text-gray-900">{item.name}</p>
                                        <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                                      </div>
                                      <p className="font-black text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                  ))}
                                  <div className="bg-gray-900 p-4 flex justify-between items-center text-white">
                                    <span className="text-sm font-bold">Grand Total</span>
                                    <span className="text-lg font-black text-indigo-400">${order.totalAmount.toFixed(2)}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}



export default Orders
