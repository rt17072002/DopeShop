import React, { useContext, useEffect, useState } from 'react';
import { ShoppingCart, Package, Plus, Minus, ArrowLeft, Star, ShieldCheck, Truck, CreditCard } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios"
import { AppContext } from '../context/AppContext';

const ProductPage = ({product}) => {

    const {id} = useParams();
    const {addToCart, backendUrl} = useContext(AppContext);
    // const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();
    const [newProduct, setNewProduct] = useState(null);

    const getProduct = async ()=>{
        const res = await axios.get(backendUrl+"/api/products/"+id);
        setNewProduct(res.data);
    }

    useEffect(()=>{
        getProduct();
    },[])


    // Fallback for demo if no product is passed
    const item = newProduct || product || {
        _id: 1,
        name: "Premium Wireless Headphones",
        price: 299,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
        description: "Experience world-class sound with advanced noise cancellation technology. These headphones deliver deep, immersive bass and crystal-clear highs for an unparalleled listening experience.",
        features: ["40h Battery Life", "Active Noise Cancelling", "Bluetooth 5.2", "Memory Foam Pads"]
    };

    const handleQuantity = (delta) => {
        setQuantity(prev => Math.max(1, prev + delta));
    };

    return (
        <div className="min-h-screen bg-white font-sans flex flex-col">


            <main className="max-w-7xl mx-auto w-full px-4 py-6 md:px-10 flex-grow">
                {/* Breadcrumbs & Back */}
                <button onClick={()=>navigate("/")} className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 mb-8 transition-colors group">
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Catalog
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Left: Image Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-square rounded-[2.5rem] overflow-hidden bg-gray-50 border border-gray-100">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                        </div>
                        {/* <div className="grid grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="aspect-square rounded-2xl bg-gray-100 border border-transparent hover:border-indigo-500 cursor-pointer overflow-hidden opacity-60 hover:opacity-100 transition-all">
                                    <img src={item.image} alt="thumbnail" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div> */}
                    </div>

                    {/* Right: Product Details */}
                    <div className="flex flex-col">
                        <div className="mb-6">
                            <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                                {item.category}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mt-4 mb-2">{item.name}</h1>
                            {/* <div className="flex items-center gap-4">
                                <div className="flex text-yellow-400">
                                    {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={16} fill="currentColor" />)}
                                </div>
                                <span className="text-sm text-gray-400 font-medium">(120 Customer Reviews)</span>
                            </div> */}
                        </div>

                        <div className="text-3xl font-black text-gray-900 mb-8">
                            ${item.price.toLocaleString()}
                        </div>

                        <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                            {item.description}
                        </p>

                        {/* Features List */}
                        <div className="grid grid-cols-2 gap-4 mb-10">
                            {item.features?.map((f, i) => (
                                <div key={i} className="flex items-center gap-2 text-gray-700">
                                    <ShieldCheck size={18} className="text-indigo-500" />
                                    <span className="text-sm font-medium">{f}</span>
                                </div>
                            ))}
                        </div>

                        <hr className="border-gray-100 mb-10" />

                        {/* Actions */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-6">
                                <span className="font-bold text-gray-900 uppercase text-xs tracking-widest">Quantity</span>
                                <div className="flex items-center bg-gray-100 rounded-2xl p-1 border border-gray-200">
                                    <button onClick={() => handleQuantity(-1)} className="p-3 hover:bg-white rounded-xl transition-all shadow-none hover:shadow-sm">
                                        <Minus size={20} strokeWidth={3} />
                                    </button>
                                    <span  className="px-6 font-black text-gray-900 min-w-[4rem] text-center text-xl">{quantity}</span>
                                    <button onClick={() => handleQuantity(1)} className="p-3 hover:bg-white rounded-xl transition-all shadow-none hover:shadow-sm">
                                        <Plus size={20} strokeWidth={3} />
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <button onClick={()=>addToCart(id, quantity)} className="flex-1 bg-gray-900 hover:bg-gray-800 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all active:scale-[0.98]">
                                    <ShoppingCart size={20} />
                                    Add to Cart
                                </button>
                                <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-lg shadow-indigo-200">
                                    <CreditCard size={20} />
                                    Buy Now
                                </button>
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-3xl border border-gray-100">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white rounded-2xl text-indigo-600">
                                    <Truck size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-sm">Free Shipping</h4>
                                    <p className="text-xs text-gray-500">Orders over $100</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white rounded-2xl text-indigo-600">
                                    <ShieldCheck size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-sm">2 Year Warranty</h4>
                                    <p className="text-xs text-gray-500">Full technical support</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default ProductPage
