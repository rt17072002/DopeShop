import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {

    const [isSidebarOpen, setIsSidebarOpen] = useState("");
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const fetchOrders= async ()=>{
        const res = await axios.get(backendUrl+"/api/orders/");
        // console.log(res.data);
        setOrders(res.data);
    }
    const fetchProducts= async ()=>{
        const res = await axios.get(backendUrl+"/api/products/");
        // console.log(res.data);
        setProducts(res.data);
    }

    useEffect(()=>{
        fetchProducts();
        fetchOrders();
    },[]);


    const value = {
        isSidebarOpen, setIsSidebarOpen,
        products, setProducts,
        orders, setOrders,
        fetchOrders,
        fetchProducts,
        backendUrl

    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;