import React, { useContext, useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import { ShoppingCart, Search, Package, Plus, Minus, Twitter, Instagram } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from "axios"


const Home = () => {

    const { cart, searchTerm, products } = useContext(AppContext);

    const filteredProducts = useMemo(() => {
        const list = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
        return list;
    },[searchTerm, products]); 

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
            <main className="grow max-w-7xl mx-auto px-4 py-6 md:px-10">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                    {searchTerm ? 'Search Results' : 'Explore Products'}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.map((item) => {
                        const quantity = cart[item._id] || 0;
                        return <ProductCard key={item._id} product={item} quantity={quantity} />
                    })}
                </div>
            </main>
        </div>
    )
}

export default Home
