import React, { useState } from 'react';
import { 
  LayoutDashboard, ShoppingBag, ListOrdered, Package, 
  Menu, X, DollarSign, Clock, TrendingUp, MoreVertical,
  ArrowUpRight, Users
} from 'lucide-react';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Orders from './pages/Orders';
import {Routes, Route} from "react-router-dom";
import Sidebar from './components/Sidebar';

const App = () => {
return (<>
{/* <Sidebar/> */}
<Routes>
  <Route path="/" element={<Products/>}/>
  <Route path="/orders" element={<Orders/>}/>
</Routes>
  </>
)
}

export default App
