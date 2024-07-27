import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from './Pages/Landing/Landing';
import Cart from './Pages/Cart/Cart';
import Orders from './Pages/Orders/Orders';
import Results from './Pages/Results/Results';
import ProductDetail from './Pages/ProductDetail.jsx/ProductDetail';
import Payments from './Pages/Payment/Payment';
import Auth from './Pages/Auth/Auth';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';

const stripePromise = loadStripe('pk_test_51PgqUFDt9BO8xqQiHXADMRcPF9CbV4qFMAt8iLuEP9wcEQqGFLqqokmHF40owDb4edvBcPGXQrqSDZaVf0zH3xVS00tuVyYQpE');

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/auth' element={<Auth />} />

        <Route path='/payment' element={
          <ProtectedRoute msg={"please log in to pay"} redirect={"/payment"}>
            <Elements stripe={stripePromise}>
              <Payments />
            </Elements>
          </ProtectedRoute>
        } />

        <Route path='/orders' element={<ProtectedRoute msg={"You must login to order"} redirect={"/orders"}>
            <Elements stripe={stripePromise}>
              <Orders />
            </Elements>
          </ProtectedRoute>} />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </Router>
  );
};

export default Routing;
