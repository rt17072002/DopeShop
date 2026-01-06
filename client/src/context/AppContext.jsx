import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {

    const [products, setProducts] = useState([])
    const [searchTerm, setSearchTerm] = useState("");
    const backendUrl = import.meta.env.VITE_BACKEND_URL;


    const [cartProducts, setCartProducts] = useState([])
    const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cartData")) || []); // State as { productId: quantity }
    const totalItems = cart.reduce((total, item) => total + item.q, 0);

    const addToCart = (id, q) => {
        setCart(prev => {
            const updated = Array.isArray(prev) ? [...prev] : [];

            const index = updated.findIndex(item => item.id === id);

            if (index !== -1) {
                updated[index].q += q;

                if (updated[index].q <= 0) {
                    updated.splice(index, 1);
                }
            } else if (q > 0) {
                updated.push({ id, q });
            }

            localStorage.setItem("cartData", JSON.stringify(updated));
            return updated;
        });
    };


    function getCartProducts(productsData, cartData) {
        const result = [];

        for (let i = 0; i < cartData.length; i++) {
            const cartItem = cartData[i];

            const product = productsData.find(
                p => String(p._id) === String(cartItem.id)
            );

            if (!product) continue;

            result.push({
                ...product,
                quantity: cartItem.q
            });
        }

        return result;
    }

    const updateQuantity = (productId, delta, productData = null) => {
        setCart((prevCart) => {
            const updatedCart = { ...prevCart };

            if (updatedCart[productId]) {
                // Update existing
                updatedCart[productId].quantity += delta;
            } else if (delta > 0 && productData) {
                // Add new (Product data passed from Card)
                updatedCart[productId] = { ...productData, quantity: 1 };
            }

            // Automatic removal if quantity hits 0
            if (updatedCart[productId] && updatedCart[productId].quantity <= 0) {
                delete updatedCart[productId];
            }

            saveToLocalStorage(updatedCart);
            return updatedCart;
        });
    };

    const fetchProducts = async () => {
        const res = await axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products/");
        setProducts(res.data)
    }

    useEffect(() => {
        fetchProducts();
    }, [])

    useEffect(() => {
        if (products.length && cart.length) {
            console.log(getCartProducts(products, cart));
            setCartProducts(getCartProducts(products, cart));
        }
    }, [products, cart]);


    const value = {
        searchTerm, setSearchTerm,
        cart, setCart,
        products, setProducts,
        totalItems,
        updateQuantity,
        fetchProducts,
        addToCart,
        cartProducts,
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;