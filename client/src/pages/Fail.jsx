import React from 'react'
import { AlertCircle, RefreshCcw, HelpCircle, X, CreditCard } from 'lucide-react';

const Fail = ({ onRetry, onSupport }) => {
    return (
        <div className="min-h-screen bg-gray-50 font-sans flex items-center justify-center p-4">
            <div className="max-w-lg w-full">
                <div className="bg-white rounded-[3rem] shadow-xl border border-gray-100 overflow-hidden">
                    <div className="p-10 text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-rose-50 rounded-full mb-6">
                            <X size={40} className="text-rose-500" strokeWidth={3} />
                        </div>
                        <h1 className="text-3xl font-black text-gray-900 mb-2">Payment Failed</h1>
                        <p className="text-gray-500 font-medium px-4">
                            Your transaction could not be processed. Don't worry, no funds were deducted.
                        </p>
                    </div>

                    <div className="px-8 pb-12">
                        <div className="bg-gray-50 rounded-3xl p-6 mb-8 border border-gray-100">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <AlertCircle size={14} /> Common Reasons
                            </h4>
                            <ul className="space-y-3 text-sm text-gray-600 font-medium">
                                <li className="flex items-center gap-2">• Incorrect card details or CVV</li>
                                <li className="flex items-center gap-2">• Insufficient funds in the account</li>
                                <li className="flex items-center gap-2">• Transaction declined by your bank</li>
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <button onClick={onRetry} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg shadow-indigo-100">
                                <RefreshCcw size={20} />
                                Try Another Payment Method
                            </button>

                            <button onClick={onSupport} className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all">
                                <HelpCircle size={20} />
                                Contact Customer Support
                            </button>
                        </div>

                        <p className="text-center text-gray-400 text-xs mt-8">
                            Order Reference: <span className="font-mono">ERR-992X-CS</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Fail
