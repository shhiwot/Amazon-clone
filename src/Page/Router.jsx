import React from 'react'
import{BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Landing from './Landing/Landing'
import Signup from './Auth/Signin'
import Payment from './Payment/Payment'
import Order from "./Order/Order"
import Cart from './Cart/Cart'
import Results from './Results/Results'
import ProductDetail from './ProductDetail/ProductDetail'

const Routering = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="aouth" element={<Signup />} />
        <Route path="/Payments" element={<Payment />} />
        <Route path="/order" element={<Order />} />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/Cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default Routering
