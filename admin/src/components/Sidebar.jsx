import React from 'react'
import { useContext } from 'react';
import { AppContext } from '../context.jsx/AppContext';
import {
    LayoutDashboard, ShoppingBag, ListOrdered, Package,
    Menu, X, Search, Filter, Eye, EyeOff, Trash2,
    ChevronLeft, ChevronRight, Users, Download, ChevronDown
} from 'lucide-react';
import { useNavigate, useLocation } from "react-router-dom"

const Sidebar = () => {
    const { isSidebarOpen, setIsSidebarOpen } = useContext(AppContext);
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location)


    return (
        <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transform transition-transform md:translate-x-0 md:static ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="p-6 flex items-center gap-3 border-b border-gray-800">
                <Package className="text-indigo-400" size={32} />
                <span className="font-black text-xl tracking-tight uppercase">Swift Admin</span>
            </div>
            <nav className="p-4 space-y-2">
                <NavItem onClick={() => navigate("/")} icon={<LayoutDashboard size={20} />} label="Dashboard" active={location.pathname === "/dashboard" ? true : false} />
                <NavItem onClick={() => navigate("/products")} icon={<ShoppingBag size={20} />} label="Products" active={location.pathname === "/products" ? true : false} />
                <NavItem onClick={() => navigate("/orders")} icon={<ListOrdered size={20} />} label="Orders" active={location.pathname === "/orders" ? true : false} />
            </nav>
        </aside>

    )
}

const NavItem = ({ icon, label, active = true }) => (
    <div className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl cursor-pointer transition-all mb-1 ${active ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
        {icon} <span className="font-bold text-sm">{label}</span>
    </div>
);

export default Sidebar
