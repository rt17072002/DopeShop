import React, { useContext, useState } from 'react';
import { Package, ShieldCheck, CreditCard, Lock, ChevronRight, ArrowLeft, MapPin, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';

const CheckoutPage = ({ cartTotal = 648, itemsCount = 3, onBack }) => {

  const [formData, setFormData] = useState({
    email: '', firstName: '', lastName: '', phone: "", address: ''
  });

  const { cart, totalItems , setCart} = useContext(AppContext);

  const navigate = useNavigate();

  const shipping = 15.00;
  const tax = cartTotal * 0.08;
  const grandTotal = cartTotal + shipping + tax;

  const verifyPayment = async (paymentResponse, orderId) => {
    try {
      const res = await axios.post("http://localhost:5000/api/orders/verify", {
        ...paymentResponse,
        orderId
      });

      console.log(res.data);

      // alert("Payment successful 🎉");
      localStorage.removeItem("cartData");
      setCart([])
      navigate("/success/"+res.data.orderId);
    } catch (err) {
      // alert("Payment verification failed");
      navigate("/failed");

    }
  };

  const openRazorpayCheckout = (razorpayOrder, order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // PUBLIC KEY ONLY
      amount: razorpayOrder.amount,
      currency: "INR",
      name: "Your Store Name",
      description: "Order Payment",
      order_id: razorpayOrder.id,

      handler: async function (response) {
        console.log("Payment Success:", response);

        // OPTIONAL but IMPORTANT
        await verifyPayment(response, order._id);
      },

      prefill: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        contact: formData.phone
      },

      theme: {
        color: "#4f46e5"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };


  const handlePlaceOrder = async (e) => {
    e.preventDefault()
    if (!formData.email || !formData.firstName || !formData.lastName || !formData.phone || !formData.address) {
      alert("Please fill the required fields");
      return;
    }
    console.log(formData);
    const res = await axios.post("http://localhost:5000/api/orders/cod", { customer: formData, items: cart });
    console.log(res);
    if (res.data.success) {
      localStorage.removeItem("cartData");
      navigate("/success");
    } else {
      navigate("/fail")
    }
    
  }
  
  const handleOnlinePayment = async (e) => {
    e.preventDefault()
    if (!formData.email || !formData.firstName || !formData.lastName || !formData.phone || !formData.address) {
      alert("Please fill the required fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/orders/place", { customer: formData, items: cart });

      const { razorpayOrder, order } = res.data;

      openRazorpayCheckout(razorpayOrder, order);
    } catch (err) {
      console.error(err);
      alert("Order creation failed");
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">


      <main className="max-w-7xl mx-auto w-full px-4 py-8 md:py-12 md:px-10 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* LEFT: CHECKOUT FORM (8 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            <button onClick={() => navigate("/cart")} className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors mb-4">
              <ArrowLeft size={18} />
              Return to Cart
            </button>

            {/* 1. Shipping Information */}
            <section className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-indigo-50 p-2 rounded-xl text-indigo-600">
                  <MapPin size={22} />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Shipping Details</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1">Email Address</label>
                  <input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} type="email" placeholder="you@example.com" className="w-full mt-1 px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" required />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1">First Name</label>
                  <input value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} type="text" className="w-full mt-1 px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" required />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1">Last Name</label>
                  <input value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} type="text" className="w-full mt-1 px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" required />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1">Phone</label>
                  <input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} type="text" className="w-full mt-1 px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" required />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1">Street Address</label>
                  <input value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} type="text" className="w-full mt-1 px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" required />
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT: ORDER SUMMARY (4 Cols) */}
          <div className="lg:col-span-5">
            <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white shadow-2xl sticky top-8">
              <h3 className="text-xl font-bold mb-6 flex items-center justify-between">
                Order Summary
                <span className="bg-white/10 text-white text-xs px-3 py-1 rounded-full">{totalItems} Items</span>
              </h3>

              <div className="space-y-3 pb-6 border-b border-white/10 text-gray-400 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">${cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-white font-medium">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax</span>
                  <span className="text-white font-medium">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center py-6 mb-8">
                <span className="text-lg font-bold">Total Amount</span>
                <span className="text-3xl font-black text-indigo-400">${grandTotal.toLocaleString()}</span>
              </div>

              <button onClick={handleOnlinePayment} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-lg shadow-indigo-900/20 active:scale-[0.98]">
                Pay Now
                <ChevronRight size={20} />
              </button>
              <button onClick={handlePlaceOrder} className="w-full bg-green-600 hover:bg-green-500 text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-lg shadow-indigo-900/20 mt-4 active:scale-[0.98]">
                Cash On Delivery
                <ChevronRight size={20} />
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-gray-500 text-xs uppercase font-bold tracking-widest">
                <ShieldCheck size={16} className="text-indigo-500" />
                Encrypted & Secure Payment
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default CheckoutPage
