import React, { useContext } from 'react'
import { ShoppingCart, Search, Package } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {

    const {searchTerm, setSearchTerm, cart, setCart, totalItems} = useContext(AppContext);
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100 px-4 py-3 md:px-10">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between w-full mb-3 md:mb-0">
                    <div className="flex items-center gap-2 text-indigo-600 font-bold text-xl md:text-2xl">
                        <Package size={28} />
                        <span onClick={() => navigate("/")} className="tracking-tight cursor-pointer">SWIFTSTORE</span>
                    </div>

                   { location.pathname==="/" && <div className="hidden md:block relative w-1/2 mx-8">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-100 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    </div>}

                    <div className="relative cursor-pointer p-2 bg-gray-100 rounded-full hover:bg-indigo-50 transition-colors">
                        <ShoppingCart onClick={() => navigate("/cart")} className="text-gray-700" size={24} />
                        {totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white animate-in zoom-in">
                                {totalItems}
                            </span>
                        )}
                    </div>
                </div>

                <div className="md:hidden relative w-full mt-2">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full pl-10 pr-4 py-3 bg-gray-100 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
                </div>
            </div>
        </nav>
    )
}

export default Navbar
