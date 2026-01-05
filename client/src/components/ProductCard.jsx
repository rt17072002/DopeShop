import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { AppContext } from '../context/AppContext'; // Adjust path as needed

const ProductCard = ({ product, quantity=1 }) => {
    const { updateQuantity, addToCart , cartProducts } = useContext(AppContext);
    const navigate = useNavigate();

    // Handler to prevent navigation when interacting with cart buttons
    const handleCartAction = (e, delta) => {
        e.stopPropagation();
        // Passing product data as the 3rd argument for the initial "Add to Cart"
        updateQuantity(product._id, delta, product);
    };

    return (
        <div  
            className="group bg-white rounded-3xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col cursor-pointer"
        >
            {/* Product Image Container */}
            <div onClick={() => navigate(`/product/${product._id}`)} className="relative h-60 w-full mb-4 rounded-2xl overflow-hidden bg-gray-100">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>

            {/* Product Details */}
            <div className="flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-gray-800 leading-tight mb-1">
                    {product.name}
                </h3>
                <p className="text-gray-400 text-xs mb-4 uppercase font-semibold tracking-widest">
                    {product.category}
                </p>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                    <span className="text-xl font-black text-gray-900">
                        ${product.price}
                    </span>

                    {/* Dynamic Button / Quantity Control */}
                    <div className="h-11 flex items-center">
                        {quantity === 0 ? (
                            /* BLACK ADD TO CART BUTTON */
                            <button
                                onClick={(e) => addToCart(product._id, 1)}
                                className="bg-gray-900 hover:bg-indigo-600 text-white p-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-indigo-200"
                            >
                                <ShoppingCart size={20} />
                            </button>
                        ) : (
                            /* INDIGO QUANTITY CONTROLLER */
                            <div 
                                onClick={(e) => e.stopPropagation()} 
                                className="flex items-center bg-indigo-50 rounded-xl overflow-hidden border border-indigo-100 shadow-sm"
                            >
                                <button
                                    onClick={(e) => handleCartAction(e, -1)}
                                    className="p-2 hover:bg-indigo-100 text-indigo-600 transition-colors"
                                >
                                    <Minus size={18} strokeWidth={3} />
                                </button>
                                
                                <span className="px-3 font-bold text-indigo-700 min-w-[2.5rem] text-center">
                                    {quantity}
                                </span>
                                
                                <button
                                    onClick={(e) => handleCartAction(e, 1)}
                                    className="p-2 hover:bg-indigo-100 text-indigo-600 transition-colors"
                                >
                                    <Plus size={18} strokeWidth={3} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;