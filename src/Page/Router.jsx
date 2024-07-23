import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Landing/Landing";

import Payment from "./Payment/Payment";
import Order from "./Order/Order";
import Cart from "./Cart/Cart";
import Results from "./Results/Results";
import ProductDetail from "./ProductDetail/ProductDetail";
import Auth from "./Auth/Auth";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "../Component/ProtactedRoute/ProtectedRoute";
const stripePromise = loadStripe(
  "pk_test_51PcuJ3Rp96tecUhTzp1oOfaBhVVrafgpIGyCGlAvztQk82y6ljuLNigx1mF6734k0awO617Z9brWfoDa5M9yaOOh00ymK5A4eP"
);
const Routering = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="aouth" element={<Auth />} />

        <Route
          path="/payments"
          element={
            <ProtectedRoute
              msg={"you must log in to pay"}
              redirect={"/payments"}
            >
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />

        <Route
          path="/order"
          element={
            <ProtectedRoute
              msg={"you must log in to access your orders"}
              redirect={"/order"}
            >
              <Order />
            </ProtectedRoute>
          }
        />

        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/Cart" element={<Cart />} />
      </Routes>
    </Router>
  );
};

export default Routering;
