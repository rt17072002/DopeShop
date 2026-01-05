import React from 'react'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import Cart from './pages/Cart'
import ProductPage from './pages/ProductPage'
import CheckoutPage from './pages/CheckoutPage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Thankyou from './pages/Thankyou'
import Fail from './pages/Fail'

const App = () => {
  return (
    <div>
      <Navbar/>
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/success/:ordernumber" element={<Thankyou />} />
        <Route path="/fail" element={<Fail />} />
      </Routes> 
      <Footer/>
    </div>
  )
}

export default App