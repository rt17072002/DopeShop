import React from 'react'
import { ShoppingCart, Search, Package, Plus, Minus, Twitter, Instagram } from 'lucide-react';


const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 py-10 px-4 md:px-10 mt-12">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-gray-400">
                <div className="flex items-center gap-2 font-bold text-lg">
                    <Package size={24} />
                    <span>SWIFTSTORE</span>
                </div>
                <p className="text-xs">© 2026 SwiftStore. Quality meets speed.</p>
                <div className="flex gap-4">
                    <Twitter size={18} className="cursor-pointer hover:text-indigo-500" />
                    <Instagram size={18} className="cursor-pointer hover:text-indigo-500" />
                </div>
            </div>
        </footer>
    )
}

export default Footer
