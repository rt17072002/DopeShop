import React, { useContext, useState } from 'react';
import { ShoppingCart, Package, Plus, Minus, ArrowLeft, Trash2, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

// Using the same dummy data for reference
const PRODUCTS = [
    { id: 1, name: "Premium Wireless Headphones", price: 299, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500", category: "Electronics" },
    { id: 2, name: "Minimalist Leather Watch", price: 150, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500", category: "Accessories" },
    { id: 3, name: "Smart Fitness Tracker", price: 89, image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500", category: "Electronics" },
];


const Cart = () => {

    // Initializing with some dummy quantities for demonstration
    const { cartProducts, addToCart } = useContext(AppContext);
    const [cart, setCart] = useState({ 1: 1, 2: 2 });
    const navigate = useNavigate();

    const shippingFee = 15.00;
    const taxRate = 0.08;

    const updateQuantity = (id, delta) => {
        setCart(prev => {
            const newQty = (prev[id] || 0) + delta;
            if (newQty <= 0) {
                const { [id]: _, ...rest } = prev;
                return rest;
            }
            return { ...prev, [id]: newQty };
        });
    };

    // Calculations
    const cartItems = cartProducts || PRODUCTS.filter(p => cart[p.id]);
    const subtotal = cartItems.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);
    const tax = subtotal * taxRate;
    const total = subtotal + tax + (subtotal > 0 ? shippingFee : 0);
    const totalCount = Object.values(cart).reduce((acc, qty) => acc + qty, 0);

    return (
        <div className="min-h-screen bg-gray-50 font-sans flex flex-col">

            <main className="max-w-7xl mx-auto w-full px-4 py-8 md:px-10 flex-grow">
                <button onClick={() => navigate("/")} className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 mb-6 transition-colors font-medium">
                    <ArrowLeft size={18} />
                    Back to Shopping
                </button>

                <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* PRODUCT LIST */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.length > 0 ? (
                            cartItems.map(product => (
                                <div key={product._id} className="bg-white rounded-3xl p-4 md:p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-6">
                                    <div className="w-24 h-24 bg-gray-100 rounded-2xl overflow-hidden flex-shrink-0">
                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                    </div>

                                    <div className="flex-grow text-center sm:text-left">
                                        <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
                                        <p className="text-gray-400 text-sm mb-2">{product.category}</p>
                                        <span className="text-indigo-600 font-bold">${product.price}</span>
                                    </div>

                                    {/* Quantity Controller */}
                                    <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-100">
                                        <button onClick={() => addToCart(product._id, -1)} className="p-2 hover:bg-white hover:shadow-sm rounded-lg text-gray-500 hover:text-indigo-600 transition-all">
                                            <Minus size={16} strokeWidth={3} />
                                        </button>
                                        <span className="px-4 font-bold text-gray-900 min-w-[3rem] text-center">{product.quantity}</span>
                                        <button onClick={() => addToCart(product._id, 1)} className="p-2 hover:bg-white hover:shadow-sm rounded-lg text-gray-500 hover:text-indigo-600 transition-all">
                                            <Plus size={16} strokeWidth={3} />
                                        </button>
                                    </div>

                                    <div className="text-right hidden sm:block min-w-[100px]">
                                        <p className="text-xs text-gray-400 uppercase font-bold mb-1">Total</p>
                                        <p className="text-lg font-black text-gray-900">${(product.price * product.quantity).toLocaleString()}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-gray-200">
                                <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
                                <p className="text-gray-500 font-medium">Your cart is empty</p>
                            </div>
                        )}
                    </div>

                    {/* ORDER SUMMARY */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-900 rounded-3xl p-8 text-white shadow-xl sticky top-24">
                            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                            <div className="space-y-4 text-gray-400 pb-6 border-b border-gray-800">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span className="text-white font-medium">${subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span className="text-white font-medium">${subtotal > 0 ? shippingFee.toFixed(2) : "0.00"}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Estimated Tax</span>
                                    <span className="text-white font-medium">${tax.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center py-6 mb-6">
                                <span className="text-lg font-bold">Total Amount</span>
                                <span className="text-2xl font-black text-indigo-400">${total.toLocaleString()}</span>
                            </div>

                            <button onClick={() => navigate("/checkout")} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all group">
                                Proceed to Checkout
                                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Cart
