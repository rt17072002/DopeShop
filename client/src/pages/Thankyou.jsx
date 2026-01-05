import React from 'react'
import { CheckCircle2, Package, ArrowRight, Truck, ShoppingBag, Calendar } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';


const Thankyou = () => {
    const navigate = useNavigate();
    const {ordernumber} = useParams();
    return (
        <div className="min-h-screen bg-gray-50 font-sans flex items-center justify-center p-4">
            <div className="max-w-2xl w-full">
                <div className="bg-white rounded-[3rem] shadow-xl overflow-hidden border border-gray-100">
                    {/* Success Header */}
                    <div className="bg-emerald-500 p-10 text-center text-white relative">
                        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none overflow-hidden">
                            <Package size={200} className="absolute -bottom-10 -right-10 rotate-12" />
                        </div>
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6 backdrop-blur-md">
                            <CheckCircle2 size={48} className="text-white" />
                        </div>
                        <h1 className="text-3xl font-black mb-2">Order Confirmed!</h1>
                        <p className="text-emerald-50 font-medium">Thank you for shopping with SwiftStore.</p>
                    </div>

                    <div className="p-8 md:p-12">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10 pb-8 border-b border-gray-100">
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Order Number</p>
                                <p className="text-xl font-black text-gray-900">#{ordernumber}</p>
                            </div>
                            <div className="text-center md:text-right">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Expected Delivery</p>
                                <p className="text-xl font-black text-indigo-600">Jan 10 - Jan 12</p>
                            </div>
                        </div>

                        {/* Delivery Timeline */}
                        {/* <div className="space-y-8 mb-10">
                            <div className="flex gap-4 relative">
                                <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-gray-100"></div>
                                <div className="relative z-10 w-6 h-6 rounded-full bg-emerald-500 border-4 border-white shadow-sm flex-shrink-0" />
                                <div>
                                    <h4 className="font-bold text-gray-900 text-sm">Order Placed</h4>
                                    <p className="text-xs text-gray-500">We've received your order and are processing it.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="relative z-10 w-6 h-6 rounded-full bg-gray-200 border-4 border-white shadow-sm flex-shrink-0" />
                                <div>
                                    <h4 className="font-bold text-gray-400 text-sm">Shipped</h4>
                                    <p className="text-xs text-gray-400">Estimated by tomorrow morning.</p>
                                </div>
                            </div>
                        </div> */}

                        <div className="flex flex-col sm:flex-row gap-4">
                            {/* <button className="flex-1 bg-gray-900 hover:bg-gray-800 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all">
                                <Truck size={18} />
                                Track Order
                            </button> */}
                            <button onClick={()=>navigate("/") } className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all">
                                Continue Shopping
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Thankyou
